/// <reference path="../all.d.ts" />
var Controllers;
(function (Controllers) {
    var controllerId = 'admin';

    var AdminController = (function () {
        function AdminController(_common) {
            this._common = _common;
            this.title = "ADmin";
            this.activate();
        }
        AdminController.prototype.activate = function () {
            var _this = this;
            this._common.activateController([], this).then(function () {
                _this._common.log('Activated Admin View');
            });
        };
        return AdminController;
    })();
    Controllers.AdminController = AdminController;

    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['common', AdminController]);
})(Controllers || (Controllers = {}));
//# sourceMappingURL=admin_my.js.map
