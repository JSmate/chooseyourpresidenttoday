'use strict';

import IComponentOptions = angular.IComponentOptions;

import {MainController} from './main.controller';

const template:string = require('./main.template.html') as string;

export const mainComponent:IComponentOptions = {
    templateUrl: template,
    controller: MainController,
    controllerAs: 'vm'
};