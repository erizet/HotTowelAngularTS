/// <reference path="../app.ts" />
/// <reference path="common.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

var spinnerFactory = (function () {
    function spinnerFactory($rootScope, common, commonConfig) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.common = common;
        this.commonConfig = commonConfig;
        this.spinnerToggle = function (show) {
            var rootScope = _this.$rootScope;

            rootScope.$broadcast(_this.commonConfig.config.spinnerToggleEvent, { show: show });
        };
    }
    spinnerFactory.prototype.spinnerHide = function () {
        this.spinnerToggle(false);
    };

    spinnerFactory.prototype.spinnerShow = function () {
        this.spinnerToggle(true);
    };
    spinnerFactory.serviceId = "spinner";
    return spinnerFactory;
})();

commonModule.factory(spinnerFactory.serviceId, [
    'rootScope', 'common', 'commonConfig',
    function ($rootScope, common, commonConfig) {
        return new spinnerFactory($rootScope, common, commonConfig);
    }]);
//# sourceMappingURL=spinner.js.map
