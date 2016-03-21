app.controller('MainCtrl', function ($scope, $ionicModal, $timeout, BookmarkStorage, $http, $window, API_URL, Auth) {
    var authInfo = $window.localStorage.getItem('authInfo') || "";

    $scope.islogin = function() {
        return Auth.isLoggedIn();
    };
    $scope.logout = function() {
        authInfo = "";
        $window.localStorage.removeItem('authInfo');
        Auth.logout();
    };

    $scope.profileMenu = [{title:'Job Posting', state:'posting', icon:'ion-ios7-home'}];
    
    $scope.mainMenu = [
        { title: 'Home', state: 'home', icon: 'ion-ios7-home' },
        { title: 'Filtered', state: 'filter', icon: 'ion-search' },
        { title: 'Bookmarked', state: 'bookmark', icon: 'ion-bookmark' }
    ];
    BookmarkStorage.fetchBookmarks($scope);
    $scope.$watch('bookmarks', function(bookmarksIdList){
        console.log('newVal',bookmarksIdList);
        if(bookmarksIdList) {
            _.each($scope.mainMenu, function(obj){
                if(obj.title == 'Bookmarked'){
                    obj.badge = bookmarksIdList.length;
                }
            })
        }
    }, true);

    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
            $scope.modal = modal;
        });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        var loginObject = {
            username: $scope.loginData.username,
            password: $scope.loginData.password
        };

        $http.post(API_URL + 'user/doLogin', loginObject).
            success(function(data, status, headers, config) {
                console.log(data);

                authInfo = data.id;
                $window.localStorage.setItem('authInfo', data.id);
                Auth.login();
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        for (var i=0; i<5; i++) {
            //$scope.jobs.push({
            //poster : getRandomPoster(),
            //title : getRandomTitle(),
            //category : getRandomCategory()
            //})
        }



        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

});