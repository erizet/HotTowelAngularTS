/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path="../../scripts/typings/angularjs/angular-route.d.ts" />

'use strict';

interface Ishell {
    busyMessage: string;
    isBusy: boolean;
}

class shell implements Ishell {
    static controllerId: string = "shell";

    logSuccess;
    events: Ievents;
    busyMessage = 'Please wait ...';
    isBusy = true;
    spinnerOptions: IspinnerOptions = {
        radius: 40,
        lines: 7,
        length: 0,
        width: 30,
        speed: 1.7,
        corners: 1.0,
        trail: 100,
        color: '#F58A00'
    };

    constructor(private $rootScope: ng.IScope, private common: Icommon, private config: Iconfig) {
        this.logSuccess = common.logger.getLogFn(shell.controllerId, 'success');
        this.events = config.events;

        this.logSuccess('Hot Towel Angular loaded!', null, true);
        common.activateController([], shell.controllerId);

        $rootScope.$on('$routeChangeStart', (event: ng.IAngularEvent, ...args: any[]) => { this.toggleSpinner(true); });

        $rootScope.$on(events.controllerActivateSuccess, (event: ng.IAngularEvent, ...args: any[]) => { this.toggleSpinner(false); });

        // TODO ?
        $rootScope.$on(events.spinnerToggle, (event: ng.IAngularEvent, ...args: any[]) => { this.toggleSpinner(false); });
    }

    toggleSpinner(on: boolean): void {
        this.isBusy = on;
    }
}

angular.module('app').controller(shell.controllerId, ['$rootScope', 'common', 'config',
    ($rootScope, common, config) => new shell($rootScope, common, config)]);