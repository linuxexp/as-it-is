angular.module("angular-common")
    .controller("HomeController", function($scope, bookStore, $state, $mdSidenav, configManager, $stateParams) {

        $scope.book  = bookStore.getBook();

        $scope.$watch("liveText", function(text) {
           if (text) {
               $state.go("home.search", {
                  query: text
               }, {
                   location: 'replace'
               });
           }
        });

        $scope.toggle = function() {
            $mdSidenav('left').toggle();
        };

        $scope.goBack = function() {
            window.history.back();
        };

        const settings = configManager.getSettings();

        if (settings.home && $state.current.name == 'home') {
            if (settings.home.chapters) {
                $state.go(".chapters");
            }

            if (settings.home.bookmarks) {
                $state.go(".bookmarks");
            }

            if (settings.home.progress) {
                $state.go(".progress");
            }
        }

    });

require("./home.view.html");
require("./home.scss");
require("directives/side-nav/side-nav.js");
require("factory/config-manager.js");