angular.module("tag")
    .controller("HomeController", function() {
        console.log("Home controller loaded");
    });

require("./home.view.html");
require("./home.css");