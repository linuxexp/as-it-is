angular.module("angular-common")
    .controller("VerseController", function ($scope, bookStore, $stateParams, utils, $sce, configManager) {

        $scope.settings = configManager.getSettings();

        const book = bookStore.getBook();
        $scope.chapter = $stateParams.chapter || _.nth(book, $stateParams.cid-1);
        $scope.verse = $stateParams.verse || _.nth($scope.chapter.verses, $stateParams.vid-1);
        console.log("verse plucked ", $scope.verse);
        console.log("chapter from parent ");

        $scope.buildFromAnnotated = function(annotated, dictionary) {
          return $sce.trustAsHtml(utils.buildFromAnnotated(annotated, dictionary));
        };

        $scope.configManager = configManager;

    });


require("./_verse.scss");
require("./verse.view.html");
require("factory/book-store.js");

require("factory/utils.js");

require("factory/config-manager.js");