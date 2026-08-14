import SwiftUI
import WebKit

struct ArabicLabWebView: UIViewRepresentable {
    let url: URL

    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []

        let controller = configuration.userContentController
        controller.add(context.coordinator, name: "haptics")
        controller.add(context.coordinator, name: "speechHaptics")
        controller.add(context.coordinator, name: "nativeFeatures")

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.load(URLRequest(url: url))
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) { }

    static func dismantleUIView(_ uiView: WKWebView, coordinator: Coordinator) {
        uiView.configuration.userContentController.removeScriptMessageHandler(forName: "haptics")
        uiView.configuration.userContentController.removeScriptMessageHandler(forName: "speechHaptics")
        uiView.configuration.userContentController.removeScriptMessageHandler(forName: "nativeFeatures")
    }

    final class Coordinator: NSObject, WKScriptMessageHandler {
        private let speechHaptics = SpeechHapticsEngine()

        func userContentController(_ userContentController: WKUserContentController,
                                   didReceive message: WKScriptMessage) {
            switch message.name {
            case "haptics":
                speechHaptics.pulse()
            case "speechHaptics":
                guard let body = message.body as? [String: Any],
                      let text = body["text"] as? String else { return }
                speechHaptics.speakArabic(text)
            case "nativeFeatures":
                break
            default:
                break
            }
        }
    }
}
