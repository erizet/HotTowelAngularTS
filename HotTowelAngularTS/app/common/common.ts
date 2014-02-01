/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

interface Icommon {
    $q: ng.IQService;
    $broadcast(): ng.IAngularEvent;
    activateController(promises, controllerId): ng.IPromise<void>;
    createSearchThrottle(viewmodel, list, filteredList, filter, delay): void;
    debouncedThrottle(key: string, callback, delay: number, immediate: boolean): void;
    isNumber(val: string): boolean;
    logger: Ilogger;
    textContains(text: string, searchText: string): boolean;
}

// Create the module and define its dependencies.
var commonModule: ng.IModule = angular.module('common', []);

// Must configure the common service and set its 
// events via the commonConfigProvider
commonModule.provider('commonConfig', function () {
    this.config = {
        // These are the properties we need to set
        //controllerActivateSuccessEvent: '',
        //spinnerToggleEvent: ''
    };

    this.$get = function () {
        return {
            config: this.config
        };
    };
});

class common implements Icommon {
    static serviceId: string = "common";

    private throttles = {};

    constructor(public $q: ng.IQService, private $rootScope: ng.IRootScopeService, private $timeout: ng.ITimeoutService, private commonConfig: any, public logger: Ilogger) {
    }

    activateController(promises, controllerId): ng.IPromise<void> {
        var commonConfig: any = this.commonConfig;
        var rootScope: ng.IRootScopeService = this.$rootScope;

        return this.$q.all(promises).then((eventArgs) => {
            var data = { controllerId: controllerId };
            rootScope.$broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
        });
    }

    $broadcast(): ng.IAngularEvent {
        return this.$rootScope.$broadcast.apply(this.$rootScope, arguments);
    }

    createSearchThrottle(viewmodel, list, filteredList, filter, delay) {
        // After a delay, search a viewmodel's list using 
        // a filter function, and return a filteredList.

        // custom delay or use default
        delay = +delay || 300;
        // if only vm and list parameters were passed, set others by naming convention 
        if (!filteredList) {
            // assuming list is named sessions, filteredList is filteredSessions
            filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string
            // filter function is named sessionFilter
            filter = list + 'Filter'; // function in string form
        }

        // create the filtering function we will call from here
        var filterFn = () => {
            // translates to ...
            // vm.filteredSessions 
            //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
            viewmodel[filteredList] = viewmodel[list].filter(function (item) {
                return viewmodel[filter](item);
            });
        };

        return (() => {
            // Wrapped in outer IFFE so we can use closure 
            // over filterInputTimeout which references the timeout
            var filterInputTimeout;

            // return what becomes the 'applyFilter' function in the controller
            return function (searchNow) {
                if (filterInputTimeout) {
                    this.$timeout.cancel(filterInputTimeout);
                    filterInputTimeout = null;
                }
                if (searchNow || !delay) {
                    filterFn();
                } else {
                    filterInputTimeout = this.$timeout(filterFn, delay);
                }
            };
        })();
    }

    debouncedThrottle(key: string, callback, delay: number, immediate: boolean) {
        // Perform some action (callback) after a delay. 
        // Track the callback by key, so if the same callback 
        // is issued again, restart the delay.

        var defaultDelay = 1000;
        delay = delay || defaultDelay;
        if (this.throttles[key]) {
            this.$timeout.cancel(this.throttles[key]);
            this.throttles[key] = undefined;
        }
        if (immediate) {
            callback();
        } else {
            this.throttles[key] = this.$timeout(callback, delay);
        }
    }

    isNumber(val: string): boolean {
        // negative or positive
        return /^[-]?\d+$/.test(val);
    }

    textContains(text: string, searchText: string): boolean {
        return !(text == null || text.length == 0) && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
    }
}

commonModule.factory(common.serviceId, ['$q', '$rootScope', '$timeout', 'commonConfig', 'logger',
    ($q, $rootScope, $timeout, commonConfig, logger) => new common($q, $rootScope, $timeout, commonConfig, logger)
]);

