/**
 * Platform sharing service currently implemented for Facebook,Twitter and Email.
 * If user wants to more social platforms code should be added here
 * Supports Android and iOS only
 */
app.factory('PlatformSharing', function (PlatformDetection) {
    return {
        /**
         * @description Shares the url and message on Facebook
         * @param msg
         * @param url
         */
        shareViaFacebook: function(msg, url) {
            if(PlatformDetection.isWeb()) {
                console.log('Sharing can only be performed from a real device');
                return;
            }
            // TODO: Use ionic.platform to identify device rather than using a separate cordova plugin
            var devicePlatform = window.device.platform;
            switch(devicePlatform) {
                case 'iOS':
                    // For ios use this code
                    window.plugins.socialsharing.shareViaFacebook(msg, null, url, function(successMsg) {
                        console.log(successMsg);
                    }, function(errorMsg){
                        console.log(errorMsg);
                    });

                    break;

                case 'Android':
                    // For android use this code
                    window.plugins.socialsharing.shareViaFacebook(msg, null, url, function(successMsg) {
                        // Code here if you want any action on success
                        // alert(successMsg);
                    }, function(errorMsg) {
                        // alert(errorMsg);
                        // Calling share intent so the user can choose what he wants to do
                        window.plugins.socialsharing.share(msg, null, null, url, function(successMsg) {
                            // alert(successMsg);
                        }, function(errorMsg){
                            alert(errorMsg);
                        });
                    });

                    break;
            }
        },
        /**
         * @description Shares the url and message on Twitter
         * @param msg
         * @param url
         */
        shareViaTwitter: function(msg, url) {
            if(PlatformDetection.isWeb()) {
                console.log('Sharing can only be performed from a real device');
                return;
            }
            var devicePlatform = window.device.platform;
            switch(devicePlatform) {
                case 'iOS':
                    // For ios use this code
                    window.plugins.socialsharing.shareViaTwitter(msg, null, url);

                    break;

                case 'Android':
                    // For android use this code
                    window.plugins.socialsharing.canShareVia('twitter', msg, null, null, null, function(successMsg){
                        // alert(successMsg);
                        window.plugins.socialsharing.shareViaTwitter(msg, null, url);
                    }, function(errorMsg){
                        // alert(errorMsg);
                        window.plugins.socialsharing.share(msg, null, null, url, function(successMsg) {
                            // alert(successMsg);
                        }, function(errorMsg){
                            alert(errorMsg);
                        });
                    });

                    break;
            }
        },
        /**
         * @description Shares the url and message on Email
         * @param msg
         * @param url
         */
        shareViaEmail: function(msg, url , recipient) {
            if(!recipient){
                recipient = 'uzi.vyper@gmail.com';
            }
            if(PlatformDetection.isWeb()) {
                console.log('Sharing can only be performed from a real device');
                return;
            }
            var subject = 'Job';
            window.plugins.socialsharing.shareViaEmail(msg + '\n' + url, subject, [recipient], null, null, null, function(successMsg) {
                console.log(successMsg);
            }, function(errormsg){
                console.log(errormsg);;
            });
        }
    };
});