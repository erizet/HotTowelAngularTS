﻿/// <reference path="app.ts" />
/// <reference path="common/common.ts" />
/// <reference path="common/logger.ts" />
/// <reference path='../Scripts/typings/angularjs/angular.d.ts'/>
'use strict';
// Extend the $exceptionHandler service to also display a toast.
function extendExceptionHandler($delegate, config, logger) {
    var appErrorPrefix = config.appErrorPrefix;
    var logError = logger.getLogFn('app', 'error');

    return function (exception, cause) {
        $delegate(exception, cause);
        if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) {
            return;
        }

        var errorData = { exception: exception, cause: cause };
        var msg = appErrorPrefix + exception.message;

        logError(msg, errorData, true);
    };
}

// Configure by setting an optional string value for appErrorPrefix.
// Accessible via config.appErrorPrefix (via config value).
app.config([
    '$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', 'config', 'logger', extendExceptionHandler]);
    }]);
//# sourceMappingURL=config.exceptionHandler.js.map
