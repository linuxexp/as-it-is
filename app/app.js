/**
 * Created by raja on 07/05/17.
 */

var app = angular.module('angular-common', ['ui.router', 'ngMaterial']);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'views/admin/admin.view.html',
            controller: 'AdminController'
        })
        .state('admin.chapter', {
            url: '/chapter',
            templateUrl: 'views/admin/chapter/admin.chapter.view.html',
            controller: 'AdminChapterController'
        })
        .state('admin.verse', {
            url: '/chapter/:cid/verse/:vid',
            templateUrl: 'views/admin/verse/admin.verse.view.html',
            controller: 'AdminVerseController',
            params: {
                vid: null,
                cid: null
            }
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home/home.view.html',
            controller: 'HomeController'
        })
        .state('home.chapters', {
            url: '/chapters',
            templateUrl: 'views/chapters/chapters.view.html',
            controller: 'ChaptersController'
        })
        .state('home.chapter', {
            url: '/chapter/:id',
            templateUrl: 'views/chapter/chapter.view.html',
            controller: 'ChapterController',
            params: {
                chapter: null
            }
        })
        .state('home.verse', {
            url: '/chapter/:cid/verse/:vid',
            templateUrl: 'views/verse/verse.view.html',
            controller: 'VerseController',
            params: {
                verse: null,
                vid: null,
                cid: null
            }
        })
        .state('home.search', {
            url: '/search/:query',
            templateUrl: 'views/search/search.view.html',
            controller: 'SearchController',
            params: {
                query: null
            }
        })
        .state('home.progress', {
            url: '/progress',
            templateUrl: 'views/progress/progress.view.html',
            controller: 'ProgressController'
        })
        .state('home.bookmarks', {
            url: '/bookmarks',
            templateUrl: 'views/bookmarks/bookmarks.view.html',
            controller: 'BookmarksController'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'views/settings/settings.view.html',
            controller: 'SettingsController',
            abstract: true
        })
        .state('settings.overview', {
            url: '/overview',
            templateUrl: 'views/settings/overview/overview.view.html',
            controller: 'OverviewController'
        })
        .state('settings.about', {
            url: '/about',
            templateUrl: 'views/settings/about/about.view.html',
            controller: 'AboutController'
        })
        .state('settings.contributors', {
            url: '/contributors',
            templateUrl: 'views/settings/contributors/contributors.view.html',
            controller: 'ContributorsController'
        })

}).run(function($state) {
    // bootstrap code here
});

require("./index.html");
require("common/css/global.css");
require("views/admin/admin.controller.js");
require("views/admin/chapter/admin.chapter.controller.js");
require("views/admin/verse/admin.verse.controller.js");

require("views/home/home.controller.js");

require("factory/book-store.js");

require("views/chapters/chapters.controller.js");
require("views/chapter/chapter.controller.js");

require("views/verse/verse.controller.js");

require("views/search/search.controller.js");
require("views/settings/settings.controller.js");

require("views/settings/about/about.controller.js");
require("views/settings/contributors/contributors.controller.js");
require("views/settings/overview/overview.controller.js");

require("views/progress/progress.controller.js");

require("views/bookmarks/bookmarks.controller.js");
