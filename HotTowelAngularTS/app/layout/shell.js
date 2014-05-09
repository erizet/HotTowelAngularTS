/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path="../../scripts/typings/angularjs/angular-route.d.ts" />
'use strict';
var shell = (function () {
    function shell($rootScope, common, config) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.common = common;
        this.config = config;
        this.busyMessage = 'Please wait ...';
        this.isBusy = true;
        this.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };
        this.logSuccess = common.logger.getLogFn(shell.controllerId, 'success');
        this.events = config.events;

        this.logSuccess('Hot Towel Angular loaded!', null, true);
        common.activateController([], shell.controllerId);

        $rootScope.$on('$routeChangeStart', function (event) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            _this.toggleSpinner(true);
        });

        $rootScope.$on(events.controllerActivateSuccess, function (event) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            _this.toggleSpinner(false);
        });

        // TODO ?
        $rootScope.$on(events.spinnerToggle, function (event) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            _this.toggleSpinner(false);
        });
    }
    shell.prototype.toggleSpinner = function (on) {
        this.isBusy = on;
    };
    shell.controllerId = "shell";
    return shell;
})();

angular.module('app').controller(shell.controllerId, [
    '$rootScope', 'common', 'config',
    function ($rootScope, common, config) {
        return new shell($rootScope, common, config);
    }]);
//# sourceMappingURL=shell.js.map
