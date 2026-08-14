import SwiftUI

@main
struct ArabicStructureLabApp: App {
    var body: some Scene {
        WindowGroup {
            // Point this to the Arabic Structure Lab web app during development.
            // For production, bundle the web assets locally or use a controlled app URL.
            ArabicLabWebView(url: URL(string: "https://example.invalid/arabic/")!)
                .ignoresSafeArea()
        }
    }
}
