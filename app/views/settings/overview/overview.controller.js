/**
 * Created by raja on 19/12/17.
 */
angular.module("angular-common")
    .controller("OverviewController", function ($scope, bookStore, $state, $stateParams, utils, configManager) {

        $scope.settings = configManager.getSettings() || {};

        $scope.$watchCollection('settings', function(settings) {
           configManager.setSettings(settings);
        });
    });


require("factory/book-store.js");
require("factory/utils.js");

require("./_overview.scss");
require("./overview.view.html");