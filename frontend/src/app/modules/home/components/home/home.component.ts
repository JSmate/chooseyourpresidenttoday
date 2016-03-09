'use strict';

import IComponentOptions = angular.IComponentOptions;

import {HomeController} from './home.controller';

const template:string = require('./home.template.html') as string;

export const homeComponent:IComponentOptions = {
    templateUrl: template,
    controller: HomeController,
    controllerAs: 'vm'
};