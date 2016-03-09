'use strict';

import IComponentOptions = angular.IComponentOptions;

import {FacebookLoginController} from './facebook-login.controller';

const template:string = require('./facebook-login.template.html') as string;

export const facebookLoginComponent:IComponentOptions = {
    templateUrl: template,
    controller: FacebookLoginController,
    controllerAs: 'vm'
};