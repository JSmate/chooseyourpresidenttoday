'use strict';

export function routes ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('main.voting', {
            url: '/voting',
            views: {
                'content@main': {
                    template: '<voting></voting>',
                }
            }
        });
}