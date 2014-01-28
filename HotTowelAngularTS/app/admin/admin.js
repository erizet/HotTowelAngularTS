/// <reference path="../app.ts" />
/// <reference path="../common/common.ts" />
/// <reference path="../common/logger.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>
'use strict';
var admin = (function () {
    function admin($scope, $http, $resource, common) {
        var _this = this;
        this.$scope = $scope;
        this.$http = $http;
        this.$resource = $resource;
        this.common = common;
        this.title = "Admin";
        this.activate = function () {
            var log = _this.log;

            _this.common.activateController([], admin.controllerId).then(function () {
                log('Activated Admin View');
            });
        };
        var getLogFn = common.logger.getLogFn;
        this.log = getLogFn(admin.controllerId);

        this.activate();
    }
    admin.controllerId = "admin";
    return admin;
})();

app.controller(admin.controllerId, [
    '$scope', '$http', '$resource', 'common', function ($scope, $http, $resource, common) {
        return new admin($scope, $http, $resource, common);
    }
]);
//# sourceMappingURL=admin.js.map
