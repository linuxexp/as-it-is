angular.module("angular-common")
    .controller("BookmarksController", function ($scope, bookStore, configManager, utils) {

        $scope.book  = bookStore.getBook();

        $scope.bookmarks = configManager.getAllBookmarks();

        $scope.docIdList = _.keys(configManager.getAllBookmarks());

        $scope.set = [];

        /*_.reduce($scope.book, (docSet, chapter) => {
            _.reduce(chapter.verses, (bookmarkedVerses, verse) => {

            }, []);
        }, []);*/

        $scope.head = function(paras) {
            return utils.head(paras);
        };

        //

        $scope.book.map((chapter) => {
            chapter.verses.map((verse) => {
               if (_.includes($scope.docIdList, verse.id)) {

                   const bookmarkObj = Object.assign(verse, {
                      chapter: chapter
                   });

                   $scope.set.push(bookmarkObj);
               }
            });
        });

        console.log("*** set ", $scope.set);

    });

require("./bookmarks.view.html");
require("./bookmarks.scss");
require("factory/book-store.js");
require("factory/config-manager.js");

require("factory/utils.js");