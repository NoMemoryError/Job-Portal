app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('home', {
            cache: false,
            url: "/",
            templateUrl: "templates/pages/job/list.html",
            controller: 'HomeCtrl'
        })

        .state('filter', {
            cache: false,
            url: "/filter",
            templateUrl: "templates/pages/job/list.html",
            controller: 'FilterCtrl'
        })

        .state('bookmark', {
            cache: false,
            url: "/bookmark",
            templateUrl: "templates/pages/job/list.html",
            controller: 'BookmarkCtrl'
        })

        .state('overview', {
            cache: false,
            url: "/overview/:_id",
            templateUrl: "templates/pages/job/overview.html",
            controller: 'OverviewCtrl'
        })

        .state('posting', {
            cache: false,
            url: "/posting",
            templateUrl: "templates/pages/job/posting.html",
            controller: 'PostingCtrl'
        })

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'AppCtrl'
        })

        .state('app.search', {
            url: "/search",
            views: {
                'menuContent': {
                    templateUrl: "templates/search.html"
                }
            }
        })

        .state('app.browse', {
            url: "/browse",
            views: {
                'menuContent': {
                    templateUrl: "templates/browse.html"
                }
            }
        })
        .state('app.playlists', {
            url: "/playlists",
            views: {
                'menuContent': {
                    templateUrl: "templates/playlists.html",
                    controller: 'PlaylistsCtrl'
                }
            }
        })

        .state('app.single', {
            url: "/playlists/:playlistId",
            views: {
                'menuContent': {
                    templateUrl: "templates/playlist.html",
                    controller: 'PlaylistCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});