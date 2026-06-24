package com.jeffben.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Handle deep link if app was launched via a QR scan / App Link
        handleDeepLinkIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        // Handle deep link when app is already running and brought to foreground
        handleDeepLinkIntent(intent);
    }

    /**
     * If the launching intent is an App Link (VIEW action with http/https scheme
     * pointing to our domain), load that URL inside the Capacitor WebView
     * instead of letting the system open Chrome.
     */
    private void handleDeepLinkIntent(Intent intent) {
        if (intent == null) return;
        String action = intent.getAction();
        Uri data = intent.getData();
        if (Intent.ACTION_VIEW.equals(action) && data != null) {
            String scheme = data.getScheme();
            String host = data.getHost();
            if ((scheme != null && (scheme.equals("https") || scheme.equals("http")))
                    && (host != null && host.equals("app-woad-beta.vercel.app"))) {
                // Build just the path+query part to navigate to within the WebView
                String path = data.getPath();
                String query = data.getQuery();
                String fragment = data.getFragment();
                StringBuilder navUrl = new StringBuilder();
                if (path != null) navUrl.append(path);
                if (query != null) navUrl.append("?").append(query);
                if (fragment != null) navUrl.append("#").append(fragment);
                final String targetPath = navUrl.toString();
                // Post to UI thread after bridge is ready
                runOnUiThread(() -> {
                    try {
                        WebView wv = getBridge().getWebView();
                        if (wv != null && !targetPath.isEmpty()) {
                            // Use JavaScript navigation so Capacitor/Next.js router handles it
                            wv.evaluateJavascript(
                                "window.location.href = '" + targetPath.replace("'", "\\'") + "';",
                                null
                            );
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });
            }
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        // Override WebViewClient so that every https/http navigation stays
        // inside the WebView and never escapes to Chrome.
        WebView webView = getBridge().getWebView();
        webView.setWebViewClient(new BridgeWebViewClient(getBridge()) {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String scheme = request.getUrl().getScheme();
                // Keep http and https inside the app WebView
                if (scheme != null && (scheme.equals("https") || scheme.equals("http"))) {
                    return false; // false = load in WebView, NOT Chrome
                }
                // Let tel:, mailto:, intent: etc. go to external apps as normal
                return super.shouldOverrideUrlLoading(view, request);
            }
        });
    }
}
