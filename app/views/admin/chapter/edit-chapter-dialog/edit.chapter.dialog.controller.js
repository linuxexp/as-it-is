angular.module("angular-common")
.controller("EditChapterDialogController", function ($scope, $mdDialog, chapter) {
    console.log("passed in $scope ", chapter);
    $scope.chapter = chapter;
    $scope.save = function() {
        $mdDialog.hide($scope.chapter);
    };
});

require("./edit.chapter.dialog.view.html");
require("./_edit.chapter.dialog.scss");