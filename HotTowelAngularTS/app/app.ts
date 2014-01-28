/// <reference path='../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../Scripts/typings/angularjs/angular-resource.d.ts'/>

'use strict';

interface Iapp extends ng.IModule { }

// Create the module and define its dependencies.
var app: Iapp = angular.module('app', [
    // Angular modules 
    'ngAnimate',        // animations
    'ngRoute',          // routing
    'ngResource',       // $resource for REST queries
    'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)


    // Custom modules 
    'common',           // common functions, logger, spinner

    //'common.bootstrap', // bootstrap dialog wrapper functions

    // 3rd Party Modules
    //'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
]);

// Handle routing errors and success events
app.run(['$route', function ($route) {
    // Include $route to kick start the router.
}]);