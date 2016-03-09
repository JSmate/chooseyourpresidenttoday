'use strict';

import IComponentOptions = angular.IComponentOptions;

import {CandidatesController} from './candidates.controller';

const template:string = require('./candidates.template.html') as string;

export const candidatesComponent:IComponentOptions = {
    templateUrl: template,
    bindings: {
        candidates: '<',

        onClick: '&'
    },
    controller: CandidatesController,
    controllerAs: 'vm'
};