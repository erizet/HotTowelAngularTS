/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>
/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />

var logger = (function () {
    function logger($log) {
        var _this = this;
        this.$log = $log;
        this.getLogFn = function (moduleId, fnName) {
            fnName = fnName || 'log';

            switch (fnName.toLowerCase()) {
                case 'success':
                    fnName = 'logSuccess';
                    break;
                case 'error':
                    fnName = 'logError';
                    break;
                case 'warn':
                    fnName = 'logWarning';
                    break;
                case 'warning':
                    fnName = 'logWarning';
                    break;
            }

            var logFn = _this[fnName] || _this.log;

            return function (msg, data, showToast) {
                logFn(msg, data, moduleId, (showToast === undefined) ? true : showToast);
            };
        };
        this.log = function (message, data, source, showToast) {
            _this.logIt(message, data, source, showToast, 'info');
        };
        this.logWarning = function (message, data, source, showToast) {
            _this.logIt(message, data, source, showToast, 'warning');
        };
        this.logSuccess = function (message, data, source, showToast) {
            _this.logIt(message, data, source, showToast, 'success');
        };
        this.logError = function (message, data, source, showToast) {
            _this.logIt(message, data, source, showToast, 'error');
        };
    }
    logger.prototype.logIt = function (message, data, source, showToast, toastType) {
        var write = (toastType === 'error') ? this.$log.error : this.$log.log;
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
    };
    logger.serviceId = "logger";
    return logger;
})();

angular.module('common').factory(logger.serviceId, [
    '$log',
    function ($log) {
        return new logger($log);
    }]);
//# sourceMappingURL=logger.js.map
