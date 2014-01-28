/// <reference path="../app.ts" />
/// <reference path="common.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

interface IspinnerFactory {
    spinnerHide() : void;
    spinnerShow() : void;
}

class spinnerFactory implements IspinnerFactory {
    static serviceId: string = "spinner";

    constructor(private $rootScope: ng.IRootScopeService, private common: Icommon, private commonConfig: any) {
    }

    spinnerHide() { this.spinnerToggle(false); }

    spinnerShow() { this.spinnerToggle(true); }

    spinnerToggle = (show) => {
        var rootScope: ng.IRootScopeService = this.$rootScope;

        rootScope.$broadcast(this.commonConfig.config.spinnerToggleEvent, { show: show });
    }
}

commonModule.factory(spinnerFactory.serviceId, ['rootScope', 'common', 'commonConfig',
    ($rootScope, common, commonConfig) => new spinnerFactory($rootScope, common, commonConfig)]
);
