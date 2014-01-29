/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path="../../scripts/typings/angularjs/angular-route.d.ts" />

interface Isidebar {
    isCurrent(route: IHotTowelRoute): string;

    navRoutes: IHotTowelRoute[];
}

class sidebar implements Isidebar {
    static controllerId: string = "sidebar";

    navRoutes: IHotTowelRoute[] = [];

    constructor(private $route: IHotTowelRouteConfig, private config: Iconfig, private routes: IHotTowelRoute[]) {
        this.getNavRoutes();
    }

    private getNavRoutes() {
        this.navRoutes = this.routes
            .filter((r: IHotTowelRoute) => r.config.settings != null && r.config.settings.nav != null)
            .sort((r1: IHotTowelRoute, r2: IHotTowelRoute) => r1.config.settings.nav - r2.config.settings.nav);
    }

    isCurrent(route: IHotTowelRoute): string {
        if (!route.config.title || !this.$route.current || !this.$route.current.title) {
            return '';
        }
        var menuName = route.config.title;

        return this.$route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }
}

angular.module('app').controller(sidebar.controllerId, ['$route', 'config', 'routes',
    ($route, config, routes) => new sidebar($route, config, routes)]);