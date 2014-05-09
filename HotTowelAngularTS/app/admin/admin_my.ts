/// <reference path="../all.d.ts" />
module Controllers
{
    var controllerId = 'admin';

    export class AdminController implements Common.IController
    {
        public title:string = "ADmin";

        constructor(private _common : Common.ICommon) {
            this.activate();
        }

        activate()
        {
            this._common.activateController([], this)
                .then(() => { this._common.log('Activated Admin View'); });
        }
    }

    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['common', AdminController]);
}

