'use strict';

import IComponentOptions = angular.IComponentOptions;

import {TopNavbarController} from './top-navbar.controller';

const template:string = require('./top-navbar.template.html') as string;

export const topNavbarComponent:IComponentOptions = {
    templateUrl: template,
    controller: TopNavbarController,
    controllerAs: 'vm'
};