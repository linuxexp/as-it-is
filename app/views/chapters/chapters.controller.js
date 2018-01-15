/**
 * Created by raja on 18/12/17.
 */
angular.module("angular-common")
    .controller("ChaptersController", function($scope, bookStore, $state) {
        $scope.book  = bookStore.getBook();

        console.log("BOOK ", $scope.book);

        $scope.takeToChapter = function(chapter) {
            $state.go("home.chapter", {
                chapter: chapter,
                id: (chapter.index+1)
            })
        }
    });

require("./chapters.view.html");
require("./_chapters.scss");
require("factory/book-store.js");
