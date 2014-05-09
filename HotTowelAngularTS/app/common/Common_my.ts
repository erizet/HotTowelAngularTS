/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
module Common
{
    export interface IController
    {
        title:string;
        activate();
    }

    export interface ICommon
    {
            // common angular dependencies
            $scope: ng.IScope;
            $q: ng.IQService;
            $timeout: ng.ITimeoutService;
            // generic
            activateController(promises: ng.IPromise<any>[], controller:IController);
            //createSearchThrottle: createSearchThrottle,
            //debouncedThrottle: debouncedThrottle,
            //isNumber: isNumber,
            //logger: logger, // for accessibility
            //textContains: textContains
    }

    export class Common implements ICommon
    {
            $scope: ng.IScope;
            $q: ng.IQService;
            $timeout: ng.ITimeoutService;
            $rootScope:ng.IScope;

        common(public $scope:ng.IScope, public $rootScope:ng.IScope, public $timeout:ng.ITimeoutService, commonConfig:commonConfig) {
        }

        public activateController(promises: ng.IPromise<any>[], controller:IController) {
            return this.$q.all(promises).then((eventArgs:any[]) => {
                var data = { controllerId: controller.title };
                //this.$scope.$broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
            });
        }

        //public $broadcast():ng.IAngularEvent {
        //    return this.$rootScope.$broadcast(.apply($rootScope, arguments);
        //}

        //function createSearchThrottle(viewmodel, list, filteredList, filter, delay) {
        //    // After a delay, search a viewmodel's list using 
        //    // a filter function, and return a filteredList.

        //    // custom delay or use default
        //    delay = +delay || 300;
        //    // if only vm and list parameters were passed, set others by naming convention 
        //    if (!filteredList) {
        //        // assuming list is named sessions, filteredList is filteredSessions
        //        filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string
        //        // filter function is named sessionFilter
        //        filter = list + 'Filter'; // function in string form
        //    }

        //    // create the filtering function we will call from here
        //    var filterFn = function () {
        //        // translates to ...
        //        // vm.filteredSessions 
        //        //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
        //        viewmodel[filteredList] = viewmodel[list].filter(function(item) {
        //            return viewmodel[filter](item);
        //        });
        //    };

        //    return (function () {
        //        // Wrapped in outer IFFE so we can use closure 
        //        // over filterInputTimeout which references the timeout
        //        var filterInputTimeout;

        //        // return what becomes the 'applyFilter' function in the controller
        //        return function(searchNow) {
        //            if (filterInputTimeout) {
        //                $timeout.cancel(filterInputTimeout);
        //                filterInputTimeout = null;
        //            }
        //            if (searchNow || !delay) {
        //                filterFn();
        //            } else {
        //                filterInputTimeout = $timeout(filterFn, delay);
        //            }
        //        };
        //    })();
        //}

        //function debouncedThrottle(key, callback, delay, immediate) {
        //    // Perform some action (callback) after a delay. 
        //    // Track the callback by key, so if the same callback 
        //    // is issued again, restart the delay.

        //    var defaultDelay = 1000;
        //    delay = delay || defaultDelay;
        //    if (throttles[key]) {
        //        $timeout.cancel(throttles[key]);
        //        throttles[key] = undefined;
        //    }
        //    if (immediate) {
        //        callback();
        //    } else {
        //        throttles[key] = $timeout(callback, delay);
        //    }
        //}

        //function isNumber(val) {
        //    // negative or positive
        //    return /^[-]?\d+$/.test(val);
        //}

        //function textContains(text, searchText) {
        //    return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        //}
    }

    export class commonConfig implements ng.IServiceProvider
    {
        private config:any = {
            // These are the properties we need to set
            //controllerActivateSuccessEvent: '',
            //spinnerToggleEvent: ''
        };
        $get: any = () => { return this.config; };
    }

    // Define the common module 
    // Contains services:
    //  - common
    //  - logger
    //  - spinner
    var commonModule = angular.module('common', []);

    // Must configure the common service and set its 
    // events via the commonConfigProvider
    commonModule.provider('commonConfig', [commonConfig]);

    commonModule.factory('common',
        ['$q', '$rootScope', '$timeout', 'commonConfig', 'logger', common]);

}

    function common($q, $rootScope, $timeout, commonConfig, logger) {
        var throttles = {};

        var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            // generic
            activateController: activateController,
            createSearchThrottle: createSearchThrottle,
            debouncedThrottle: debouncedThrottle,
            isNumber: isNumber,
            logger: logger, // for accessibility
            textContains: textContains
        };

        return service;


    }
})(); 