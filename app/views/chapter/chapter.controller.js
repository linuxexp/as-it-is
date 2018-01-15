/**
 * Created by raja on 18/12/17.
 */
angular.module("angular-common")
    .controller("ChapterController", function($scope, $stateParams, $state, bookStore) {
        $scope.chapter = $stateParams.chapter || _.nth(bookStore.getBook(), ($stateParams.id-1));
        $scope.takeToVerse = function(verse) {
            $state.go("home.verse", {
                verse: verse,
                chapter: $scope.chapter,
                vid: (verse.index+1),
                cid: ($scope.chapter.index+1)
            });
        };

        $scope.headPurport = function(purport) {
            return _.head(purport);
        }

    });

require("./chapter.view.html");
require("./_chapter.scss");

require("factory/book-store.js");