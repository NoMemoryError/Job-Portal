app.controller('HomeCtrl', function ($scope, $http, API_URL) {

    $scope.jobs = [];
    $scope.title = "All Jobs"

    $http.get(API_URL + 'job').
        success(function(data, status, headers, config) {
            console.log(data);
            _.each(data, function(job) {
                job.poster = getRandomPoster();
                $scope.jobs.push(job);
            })
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
});

app.controller('FilterCtrl', function ($scope, $http, SearchCriteria, API_URL) {

    $scope.jobs = [];
    $scope.title = "Filtered"

    var paramsObject = SearchCriteria.getJobMapObject();
    var criteriaObject = {};

    Object.keys(paramsObject).forEach(function (key) {
        if(paramsObject[key].value != "") {
            criteriaObject[key] = paramsObject[key].value;
        }
    });

    $http.post(API_URL + 'job/filter', criteriaObject).
        success(function(data, status, headers, config) {
            console.log(data);
            _.each(data, function(job){
                job.poster = getRandomPoster();
            })
            $scope.jobs = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            for (var i=0; i<5; i++) {
                $scope.jobs.push({
                    poster : getRandomPoster(),
                    title : getRandomTitle(),
                    category : getRandomCategory()
                })
            }
        });
});

app.controller('BookmarkCtrl', function ($scope, BookmarkStorage, API_URL, $http) {

    $scope.jobs = [];
    $scope.title = "Bookmarked";

    var bookmarkIds = BookmarkStorage.getBookmarks();
//    var bookmarkObject = {
//        bookmarkIds: bookmarkIds
//    };
//    console.log('BookmarksList', bookmarkIds);

    $http.get(API_URL + 'job').
        success(function(data, status, headers, config) {
            console.log(data);
            _.each(data, function(job){
                if(_.contains(bookmarkIds, job.id)){
                    job.poster = getRandomPoster();
                    $scope.jobs.push(job);
                }
            })
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            for (var i=0; i<5; i++) {
                $scope.jobs.push({
                    poster : getRandomPoster(),
                    title : getRandomTitle(),
                    category : getRandomCategory()
                })
            }
        });
});

app.controller('OverviewCtrl', function ($scope, $stateParams, $http, API_URL, PlatformSharing) {
    console.log($stateParams);
    $http.get(API_URL + 'job/' + $stateParams._id).
        success(function(data, status, headers, config) {
            data.poster = getRandomPoster();
            console.log(data);
            $scope.job = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    $scope.apply = function() {
        PlatformSharing.shareViaEmail('','',$scope.job.contact.email);
    }
});

app.controller('PostingCtrl', function ($scope, $http, API_URL, $state) {
    $scope.postingJob = {contact:{}, address:{}};
    $scope.postJob = function() {
        $http.post(API_URL + 'job/posting', $scope.postingJob).
            success(function(data, status, headers, config) {
                console.log(data);
                $state.go('home');
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
});