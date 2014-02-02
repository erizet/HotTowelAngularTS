/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>
/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />

'use strict';

interface Ilogger {
    getLogFn: (moduleId: string, fnName: string) => any;
    log: (message: string, data: any, source: string, showToast: boolean) => void;
    logError: (message: string, data: any, source: string, showToast: boolean) => void;
    logSuccess: (message: string, data: any, source: string, showToast: boolean) => void;
    logWarning: (message: string, data: any, source: string, showToast: boolean) => void;
}

class logger implements Ilogger {
    static serviceId: string = "logger";

    constructor(private $log: ng.ILogService) {
    }

    getLogFn = (moduleId: string, fnName: string) => {
        fnName = fnName || 'log';

        switch (fnName.toLowerCase()) { // convert aliases
            case 'success':
                fnName = 'logSuccess'; break;
            case 'error':
                fnName = 'logError'; break;
            case 'warn':
                fnName = 'logWarning'; break;
            case 'warning':
                fnName = 'logWarning'; break;
        }

        var logFn = this[fnName] || this.log;

        return (msg, data, showToast) => {
            logFn(msg, data, moduleId, (showToast === undefined) ? true : showToast);
        };
    }

    log = (message: string, data: any, source: string, showToast: boolean) => {
        this.logIt(message, data, source, showToast, 'info');
    }

    logWarning = (message: string, data: any, source: string, showToast: boolean) => {
        this.logIt(message, data, source, showToast, 'warning');
    }

    logSuccess = (message: string, data: any, source: string, showToast: boolean) => {
        this.logIt(message, data, source, showToast, 'success');
    }

    logError = (message: string, data: any, source: string, showToast: boolean) => {
        this.logIt(message, data, source, showToast, 'error');
    }

    logIt(message: string, data: any, source: string, showToast: boolean, toastType: string): void {
        var write: ng.ILogCall = (toastType === 'error') ? this.$log.error : this.$log.log;
        source = source ? '[' + source + '] ' : '';

        write(source, message, data);

        if (showToast) {
            if (toastType === 'error') {
                toastr.error(message);
            } else if (toastType === 'warning') {
                toastr.warning(message);
            } else if (toastType === 'success') {
                toastr.success(message);
            } else {
                toastr.info(message);
            }
        }
    }
}

angular.module('common').factory(logger.serviceId, ['$log', ($log) => new logger($log)]);