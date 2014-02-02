/// <reference path="../app.ts" />
/// <reference path="../common/common.ts" />
/// <reference path="../common/logger.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

'use strict';

interface IdashboardNews {
    title: string;
    description: string;
}

interface Idashboard {
    title: string;
    news: IdashboardNews;
    messageCount: number;
    people: Iperson[];
}

class dashboard implements Idashboard {
    static controllerId: string = "dashboard";
    title: string = "Dashboard";

    messageCount: number = 0;
    people: Iperson[] = [];
    news: IdashboardNews = {
        title: 'Hot Towel Angular',
        description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };

    log: any;

    constructor(private datacontext: Idatacontext, private common: Icommon) {
        var getLogFn: any = common.logger.getLogFn;
        this.log = getLogFn(dashboard.controllerId);

        this.activate();
    }

    activate = () => {
        var log = this.log;

        var promises = [this.getMessageCount(), this.getPeople()];
        this.common.activateController(promises, dashboard.controllerId).then(() => {
            log('Activated Dashboard View');
        });
    }

    getMessageCount() {
        this.datacontext.getMessageCount().then((data: number) => {
            this.messageCount = data;
        });
    }

    getPeople() {
        this.datacontext.getPeople().then((data: Iperson[]) => {
            this.people = data;
        });
    }
}

app.controller(dashboard.controllerId, [
    'datacontext', 'common', (datacontext, common) => new dashboard(datacontext, common)
]);