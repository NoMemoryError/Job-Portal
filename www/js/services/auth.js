app.factory('Auth', function ($window, API_URL) {
    var authInfo = $window.localStorage.getItem('authInfo') || "";

    return {
        login: function () {
            authInfo = $window.localStorage.getItem('authInfo') || "";
        },
        isLoggedIn: function () {
            if(authInfo){
                return true;
            } else {
                return false;
            }
        },
        logout: function () {
            authInfo = "";
            $window.localStorage.removeItem('authInfo');
        }
    };
});