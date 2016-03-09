'use strict';

import IComponentOptions = angular.IComponentOptions;

import {VotingController} from './voting.controller';

const template:string = require('./voting.template.html') as string;

export const votingComponent:IComponentOptions = {
    templateUrl: template,
    controller: VotingController,
    controllerAs: 'vm'
};