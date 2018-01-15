angular.module("angular-common")
    .controller("HomeController", function($scope, bookStore, $state, $mdSidenav) {

        $scope.book  = bookStore.getBook();
        console.log("bookStore ", bookStore);

        $scope.$watch("liveText", function(text) {
           //if (text) {
               console.log("t ", text);
               $state.go("home.search", {
                  query: text
               }, {
                   location: 'replace'
               });
           //}
        });

        $scope.toggle = function() {
            $mdSidenav('left').toggle();
        };

        $scope.goBack = function() {
            window.history.back();
        };
    });

require("./home.view.html");
require("./home.scss");
require("app/views/home/bottom-sheet-list-template/bottom-sheet-list-template.js");