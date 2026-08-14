import AVFoundation
import CoreHaptics
import UIKit

/// Arabic speech + tactile rhythm. The web UI sends text through WKScriptMessageHandler.
final class SpeechHapticsEngine: NSObject, AVSpeechSynthesizerDelegate {
    private let synthesizer = AVSpeechSynthesizer()
    private var hapticEngine: CHHapticEngine?
    var hapticsEnabled = true

    override init() {
        super.init()
        synthesizer.delegate = self
        prepareHaptics()
    }

    private func prepareHaptics() {
        guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }
        do {
            hapticEngine = try CHHapticEngine()
            hapticEngine?.stoppedHandler = { [weak self] _ in try? self?.hapticEngine?.start() }
            try hapticEngine?.start()
        } catch {
            hapticEngine = nil
        }
    }

    func speakArabic(_ text: String, rate: Float = 0.46) {
        synthesizer.stopSpeaking(at: .immediate)
        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = AVSpeechSynthesisVoice(language: "ar-SA")
        utterance.rate = rate
        utterance.preUtteranceDelay = 0.03
        utterance.postUtteranceDelay = 0.05
        synthesizer.speak(utterance)
    }

    func stop() {
        synthesizer.stopSpeaking(at: .immediate)
    }

    func pulse(intensity: Float = 0.24, sharpness: Float = 0.35) {
        guard hapticsEnabled, let engine = hapticEngine else { return }
        let event = CHHapticEvent(
            eventType: .hapticTransient,
            parameters: [
                CHHapticEventParameter(parameterID: .hapticIntensity, value: intensity),
                CHHapticEventParameter(parameterID: .hapticSharpness, value: sharpness)
            ],
            relativeTime: 0
        )
        do {
            let pattern = try CHHapticPattern(events: [event], parameters: [])
            let player = try engine.makePlayer(with: pattern)
            try player.start(atTime: 0)
        } catch { }
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer,
                           willSpeakRangeOfSpeechString characterRange: NSRange,
                           utterance: AVSpeechUtterance) {
        pulse(intensity: 0.20, sharpness: 0.30)
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer,
                           didStart utterance: AVSpeechUtterance) {
        pulse(intensity: 0.16, sharpness: 0.20)
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer,
                           didFinish utterance: AVSpeechUtterance) {
        pulse(intensity: 0.12, sharpness: 0.18)
    }
}
