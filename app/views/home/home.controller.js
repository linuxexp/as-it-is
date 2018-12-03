angular.module("angular-common")
    .controller("HomeController", function($scope, bookStore, $state, $mdSidenav, configManager, $stateParams) {

        $scope.book  = bookStore.getBook();

        $scope.queryKeyPressed = function(key) {
            if (!key) return;
            if (key.which === 13) {
                $state.go("home.search", {
                    query: $scope.liveText
                });
            }
        };

        $scope.toggle = function() {
            $mdSidenav('left').toggle();
        };

        $scope.goBack = function() {
            window.history.back();
        };

        const settings = configManager.getSettings();

        $scope.$watch(function() {
            return $state.$current.name;
        }, function(newState, oldState) {
            $scope.showNotice = (newState && newState === 'home') || false;
        });

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