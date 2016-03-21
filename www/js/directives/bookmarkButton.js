app.directive('bookmarkButton', function(BookmarkStorage){
    return {
        restrict: 'E',
        link : function(scope,el,attrs) {
            console.log(attrs);
            scope.isBookmarked = function() {
                return BookmarkStorage.isBookmarked(attrs.jobid);
            };

            scope.addBookmark = function() {
                BookmarkStorage.addBookmark(attrs.jobid);
            }

            scope.removeBookmark = function() {
                BookmarkStorage.removeBookmark(attrs.jobid);
            }
        },
        templateUrl: 'templates/directives/bookmarkButton.html'
    };
});