import { Chapter } from "../../../factory/book-admin";

angular.module("angular-common")
    .controller("AdminChapterController", function ($scope, bookAdmin, $mdDialog) {

        $scope.chapters = [];
        $scope.expandedChapterIndex = null;

        $scope.$watch(() => bookAdmin.getBook(), function(chapters) {
            console.log("updating book chapters");
            $scope.chapters = bookAdmin.getBook();
        });

        $scope.addChapter = function() {
            bookAdmin.addChapter(new Chapter($scope.chapters.length, 'Chapter Title', 'Chapter Purport', []));
        };

        $scope.expandChapter = function(index) {
            // we want to make sure immutable updates to original obj
            const chapter = Object.assign({}, $scope.chapters[index]);
            $scope.expandedChapterIndex = index;
            console.log(index);

            $mdDialog.show({
                controller: 'EditChapterDialogController',
                templateUrl: 'views/admin/chapter/edit-chapter-dialog/edit.chapter.dialog.view.html',
                parent: angular.element(document.body),
                locals: { chapter: chapter},
                clickOutsideToClose:true,
            })
            .then(function(chapter) {
                return bookAdmin.updateChapter(chapter.index, chapter);
            })
            .catch((e) => null)
        }
    });

require("./admin.chapter.view.html");
require("factory/book-admin.js");
require("./edit-chapter-dialog/edit.chapter.dialog.controller.js");
