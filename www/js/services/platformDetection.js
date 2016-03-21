/**
 * Service that detects the platform for code execution
 * This service currently only supports web, iOS and android
 */
app.factory('PlatformDetection', function() {
    return {
        isWeb : function() {
            if(ionic.Platform.isWebView()) {
                return false;
            } else {
                return true;
            }
        },

        isIOS : function() {
            return ionic.Platform.isIOS();
        },

        isAndroid : function() {
            return ionic.Platform.isAndroid();
        }
    }
});