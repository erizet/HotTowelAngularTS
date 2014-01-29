/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />

'use strict';

var app = angular.module('app');

// Collect the routes
app.constant('routes', getRoutes());

// Configure the routes and route resolvers
app.config(['$routeProvider', 'routes', routeConfigurator]);


class routeConfigurator {
    constructor(private $routeProvider: ng.route.IRouteProvider, private routes: IHotTowelRoute[]) {
        console.log("routeConfigurator");

        routes.forEach(r=> {
            $routeProvider.when(r.url, r.config);
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }
}

interface IHotTowelRouteSettings {
    nav: number;
    content: string;
}

interface IHotTowelRouteConfig extends ng.route.IRoute {
    title: string;
    settings: IHotTowelRouteSettings;
}

interface IHotTowelRoute {
    url: string;
    config: IHotTowelRouteConfig;
}

// Define the routes 
function getRoutes() {
    return [
        {
            url: '/',
            config: {
                templateUrl: 'app/dashboard/dashboard.html',
                title: 'dashboard',
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                }
            }
        }, {
            url: '/admin',
            config: {
                title: 'admin',
                templateUrl: 'app/admin/admin.html',
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-lock"></i> Admin'
                }
            }
        }
    ];
}