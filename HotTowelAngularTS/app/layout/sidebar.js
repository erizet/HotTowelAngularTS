/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path="../../scripts/typings/angularjs/angular-route.d.ts" />

var sidebar = (function () {
    function sidebar($route, config, routes) {
        this.$route = $route;
        this.config = config;
        this.routes = routes;
        this.navRoutes = [];
        this.getNavRoutes();
    }
    sidebar.prototype.getNavRoutes = function () {
        this.navRoutes = this.routes.filter(function (r) {
            return r.config.settings != null && r.config.settings.nav != null;
        }).sort(function (r1, r2) {
            return r1.config.settings.nav - r2.config.settings.nav;
        });
    };

    sidebar.prototype.isCurrent = function (route) {
        if (!route.config.title || !this.$route.current || !this.$route.current.title) {
            return '';
        }
        var menuName = route.config.title;

        return this.$route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    };
    sidebar.controllerId = "sidebar";
    return sidebar;
})();

angular.module('app').controller(sidebar.controllerId, [
    '$route', 'config', 'routes',
    function ($route, config, routes) {
        return new sidebar($route, config, routes);
    }]);
//# sourceMappingURL=sidebar.js.map
