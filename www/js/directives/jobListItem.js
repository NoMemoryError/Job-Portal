app.directive('jobListItem', function () {
    return {
        restrict: 'E',
        scope: {
            job: '='
        },
        templateUrl: 'templates/directives/jobListItem.html'
    }
});