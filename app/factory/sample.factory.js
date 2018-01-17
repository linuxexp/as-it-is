angular.module('angular-common')
    .factory('SampleFactory', function () {
        // Stub obj for Unit Testing, check tests under root/tests/
        return {
            get: () => "get",
            set: () => "set"
        }
    });