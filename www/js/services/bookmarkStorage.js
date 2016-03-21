app.service('BookmarkStorage', function() {
    var bookmarks = [];

    return {
        fetchBookmarks : function(scope) {
            scope.bookmarks = bookmarks
        },

        getBookmarks : function() {
            return bookmarks;
        },

        addBookmark: function(id){
            bookmarks.push(id);
        },

        removeBookmark: function(id){
            var index = bookmarks.indexOf(id);
            if(index > -1) {
                bookmarks.splice(index,1);
            }
        },

        isBookmarked: function(id) {
            var index = bookmarks.indexOf(id);
            if(index > -1) {
                return true;
            } else {
                return false;
            }
        }
    }
})