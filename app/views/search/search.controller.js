angular.module("angular-common")
    .controller("SearchController", function ($scope, bookStore, $state, $stateParams, utils) {

        $scope.query = $stateParams.query;

        $scope.results = utils.getSearchResults($scope.query, bookStore.getBook());

        console.log("results", $scope.results);

        $scope.head = function(paras) {
            return utils.head(paras);
        };

        $scope.goToVerse = function(verse, chapter) {
            console.log("chapter verse", chapter, verse);
            $state.go("home.verse", {
              verse: verse,
              chapter: chapter,
              cid: chapter.index+1,
              vid: verse.index+1
          })
        };

        $scope.goToChapter = function(chapter) {
            $state.go("home.chapter",  {
                chapter: chapter,
                id: chapter.index+1
            });
        };

        $scope.goToEntity = function(result) {
            if (result.doc.entity == "chapter") {
                $scope.goToChapter(result.doc);
            }
            if (result.doc.entity == "verse") {
                $scope.goToVerse(result.doc, result.ancestor);
            }
        };

    });


require("factory/book-store.js");
require("factory/utils.js");
require("./_search.scss");
require("./search.view.html");