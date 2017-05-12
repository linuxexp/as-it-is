angular.module("angular-common")
    .controller("HomeController", function() {
        console.log("nested view loaded");
        $(document).ready(function(){
            $('.carousel').carousel();
        });
    });

require("./home.view.html");
require("./home.css");