angular.module('angular-common')
    .directive('sideNav', function ($mdSidenav) {
        return {
            restrict: 'E',
            templateUrl: 'directives/side-nav/side-nav.html',
            controller: function($scope) {

                $scope.close = function () {
                    $mdSidenav('left').close();

                };
            }
        };
    });

require("./side-nav.html");