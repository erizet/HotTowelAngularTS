/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

// Create the module and define its dependencies.
var commonModule = angular.module('common', []);

// Must configure the common service and set its
// events via the commonConfigProvider
commonModule.provider('commonConfig', function () {
    this.config = {};

    this.$get = function () {
        return {
            config: this.config
        };
    };
});

var common = (function () {
    function common($q, $rootScope, $timeout, commonConfig, logger) {
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.commonConfig = commonConfig;
        this.logger = logger;
        this.throttles = {};
    }
    common.prototype.activateController = function (promises, controllerId) {
        var commonConfig = this.commonConfig;
        var rootScope = this.$rootScope;

        return this.$q.all(promises).then(function (eventArgs) {
            var data = { controllerId: controllerId };
            rootScope.$broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
        });
    };

    common.prototype.$broadcast = function () {
        return this.$rootScope.$broadcast.apply(this.$rootScope, arguments);
    };

    common.prototype.createSearchThrottle = function (viewmodel, list, filteredList, filter, delay) {
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
        var filterFn = function () {
            // translates to ...
            // vm.filteredSessions
            //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
            viewmodel[filteredList] = viewmodel[list].filter(function (item) {
                return viewmodel[filter](item);
            });
        };

        return (function () {
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
    };

    common.prototype.debouncedThrottle = function (key, callback, delay, immediate) {
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
    };

    common.prototype.isNumber = function (val) {
        // negative or positive
        return /^[-]?\d+$/.test(val);
    };

    common.prototype.textContains = function (text, searchText) {
        return !(text == null || text.length == 0) && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
    };
    common.serviceId = "common";
    return common;
})();

commonModule.factory(common.serviceId, [
    '$q', '$rootScope', '$timeout', 'commonConfig', 'logger',
    function ($q, $rootScope, $timeout, commonConfig, logger) {
        return new common($q, $rootScope, $timeout, commonConfig, logger);
    }
]);
//# sourceMappingURL=common.js.map
