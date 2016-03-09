'use strict';

export function routes ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('main.home', {
            url: '/home',
            views: {
                'content@main': {
                    template: '<home></home>',
                }
            }
        });
}