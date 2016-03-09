'use strict';

import IComponentOptions = angular.IComponentOptions;

import {CandidateController} from './candidate.controller';

const template:string = require('./candidate.template.html') as string;

export const candidateComponent:IComponentOptions = {
    templateUrl: template,
    bindings: {
        candidate: '<',

        onClick: '&'
    },
    controller: CandidateController,
    controllerAs: 'vm'
};