/**
 * Created by raja on 19/12/17.
 */
angular.module("angular-common")
    .controller("OverviewController", function ($scope, bookStore, $state, $stateParams, utils, configManager) {

        $scope.settings = configManager.getSettings() || {};

        $scope.$watch('settings', function(settings) {
           configManager.setSettings(settings);
        }, true);

        $scope.clear = function(entity) {
            switch(entity) {
                case 'settings':
                    configManager.setSettings({});
                break;
                case 'bookmarks':
                    configManager.clearAllBookmarks();
                break;
                case 'reads':
                    configManager.clearAllRead();
                 break;

            }
        }
    });


require("factory/book-store.js");
require("factory/utils.js");

require("./_overview.scss");
require("./overview.view.html");