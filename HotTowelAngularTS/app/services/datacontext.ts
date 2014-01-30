/// <reference path="../app.ts" />
/// <reference path='../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path='../../Scripts/typings/angularjs/angular-resource.d.ts'/>

'use strict';

interface Iperson {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

interface Idatacontext {
    greeting: string;
    getMessageCount(): ng.IPromise<number>;
    getPeople(): ng.IPromise<Iperson[]>;
}

class datacontext implements Idatacontext {
    static serviceId: string = "datacontext";
    greeting = "Hello";

    $q: ng.IQService;

    constructor(private common: Icommon) {
        this.$q = common.$q;
    }

    getMessageCount(): ng.IPromise<number> {
        return this.$q.when(72);
    }

    getPeople(): ng.IPromise<Iperson[]> {
        var people: Iperson[] = [
            { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
            { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
            { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
            { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
            { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
            { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
            { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
        ];

        return this.$q.when(people);
    }
}

app.factory(datacontext.serviceId, ['common', (common) =>
    new datacontext(common)
]);
