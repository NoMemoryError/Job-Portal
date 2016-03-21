app.controller('SearchCtrl', function ($scope, $state, $stateParams, $ionicSideMenuDelegate, SearchCriteria) {

    $scope.criteria = {};
    SearchCriteria.getJobMapOptions($scope);
    $scope.$watch('searchCriteriaOpts', function() {

        $scope.criteria.category = (SearchCriteria.getJobMapParam('category')).value;
        $scope.criteria.title = (SearchCriteria.getJobMapParam('title')).value;
        $scope.criteria.country = (SearchCriteria.getJobMapParam('country')).value;
        $scope.criteria.region = (SearchCriteria.getJobMapParam('region')).value;
        $scope.criteria.city = (SearchCriteria.getJobMapParam('city')).value;

    }, true);

    $scope.search = function() {
        Object.keys($scope.criteria).forEach(function (key) {
            SearchCriteria.setJobMapParam(key,$scope.criteria[key]);
        });

        $state.go('filter',$stateParams,{
            reload: true
        });
        $ionicSideMenuDelegate.toggleRight();
    }
});