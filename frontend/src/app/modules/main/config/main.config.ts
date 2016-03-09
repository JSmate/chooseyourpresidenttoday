'use strict';

export function config ($locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/home');
}