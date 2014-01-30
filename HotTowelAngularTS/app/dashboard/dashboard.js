/// <reference path="../app.ts" />
/// <reference path="../common/common.ts" />
/// <reference path="../common/logger.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>
'use strict';
var dashboard = (function () {
    function dashboard(datacontext, common) {
        var _this = this;
        this.datacontext = datacontext;
        this.common = common;
        this.title = "Dashboard";
        this.messageCount = 0;
        this.people = [];
        this.news = {
            title: 'Hot Towel Angular',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        this.activate = function () {
            var log = _this.log;

            var promises = [_this.getMessageCount(), _this.getPeople()];
            _this.common.activateController(promises, dashboard.controllerId).then(function () {
                log('Activated Dashboard View');
            });
        };
        var getLogFn = common.logger.getLogFn;
        this.log = getLogFn(dashboard.controllerId);

        this.activate();
    }
    dashboard.prototype.getMessageCount = function () {
        var _this = this;
        this.datacontext.getMessageCount().then(function (data) {
            _this.messageCount = data;
        });
    };

    dashboard.prototype.getPeople = function () {
        var _this = this;
        this.datacontext.getPeople().then(function (data) {
            _this.people = data;
        });
    };
    dashboard.controllerId = "dashboard";
    return dashboard;
})();

app.controller(dashboard.controllerId, [
    'datacontext', 'common', function (datacontext, common) {
        return new dashboard(datacontext, common);
    }
]);
//# sourceMappingURL=dashboard.js.map
