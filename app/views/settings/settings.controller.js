/**
 * Created by raja on 19/12/17.
 */
angular.module("angular-common")
    .controller("SettingsController", function ($scope, bookStore, $state, $stateParams, utils, configManager) {

        utils.getProgress(bookStore.getBook(), _.keys(configManager.getRead()));

    });


require("factory/book-store.js");
require("factory/utils.js");
require("./_settings.scss");
require("./settings.view.html");

require("factory/config-manager.js");