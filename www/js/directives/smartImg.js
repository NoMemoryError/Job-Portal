app.directive('smartImg', function () {
    return {
        restrict: 'E',
        scope: {
            src: '@'
        },
        templateUrl: 'templates/directives/smartImg.html'
    };
});