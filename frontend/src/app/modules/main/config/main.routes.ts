'use strict';

export function routes ($stateProvider) {
    'ngInject';

    $stateProvider
        .state('main', {
            abstract: true,
            views: {
                main: {
                    template: '<main></main>',
                }
            }
        });
}