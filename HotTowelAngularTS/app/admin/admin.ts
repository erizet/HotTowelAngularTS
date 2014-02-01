/// <reference path="../app.ts" />
/// <reference path="../common/common.ts" />
/// <reference path="../common/logger.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

'use strict';

interface IadminScope extends ng.IScope {

}

interface Iadmin {
    title: string;
}

class admin implements Iadmin {
    static controllerId: string = "admin";
    title: string = "Admin";

    log: any;

    constructor(private $scope: IadminScope, private $http: ng.IHttpService, private $resource: ng.resource.IResourceService, private common: Icommon) {
        var getLogFn: any = common.logger.getLogFn;
        this.log = getLogFn(admin.controllerId);

        this.activate();
    }

    activate = () => {
        var log = this.log;

        this.common.activateController([], admin.controllerId).then(() => {
            log('Activated Admin View');
        });
    }
}

app.controller(admin.controllerId, [
    '$scope', '$http', '$resource', 'common', ($scope, $http, $resource, common) =>
        new admin($scope, $http, $resource, common)
]);