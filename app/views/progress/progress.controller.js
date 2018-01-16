angular.module("angular-common")
    .controller("ProgressController", function ($scope, utils, configManager, bookStore) {

        const settings = configManager.getSettings();

        if (settings.track_progress) {
            $scope.progress = utils.getProgress(bookStore.getBook(),
                _.keys(configManager.getRead()));
            $scope.groupByChapter = _.groupBy($scope.progress.verses, "chapter.index");
            $scope.readTable = _.groupBy($scope.progress.filtered, "id");
        } else {
            $scope.progressViewDisabled = true;
        }
    });

require("./_progress.scss");
require("./progress.view.html");

require("factory/book-store.js");
require("factory/utils.js");

require("factory/config-manager.js");