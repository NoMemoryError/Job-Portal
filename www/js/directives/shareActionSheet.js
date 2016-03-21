app.directive('shareActionSheet', function ($ionicGesture, $ionicActionSheet, $timeout, PlatformSharing) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var listener = function () {
                var params = JSON.parse(attrs.shareActionSheet);
                console.log('Params', params);
                scope.$apply(function () {

                    var title = 'Share';
                    var hideSheet = $ionicActionSheet.show({
                        buttons: [
                            { text: 'Facebook' },
                            { text: 'Twitter' },
                            { text: 'Email' }
                        ],
                        titleText: title,
                        cancelText: 'Cancel',
                        buttonClicked: function (index) {

                            var webURL = "";
                            var msg = params.title + "\n\n " + params.description + "\n\nApply at: " + params.contact.email ;
                            console.log(msg);

                            switch(index) {
                                case 0:
                                    PlatformSharing.shareViaFacebook(msg, webURL);
                                    break;
                                case 1:
                                    PlatformSharing.shareViaTwitter(msg, webURL);
                                    break;
                                case 2:
                                    PlatformSharing.shareViaEmail(msg, webURL);
                                    break;
                            }
                            return true;
                        }
                    });

                    $timeout(function () {
                        hideSheet();
                    }, 5000);
                });
            };

            var gesture = $ionicGesture.on('click', listener, elem);

            scope.$on('$destroy', function () {
                $ionicGesture.off(gesture, 'click', listener);
            });
        }
    };
});