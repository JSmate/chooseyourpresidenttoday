import {IModule} from 'angular';

import * as angular from 'angular';

import {routes} from './config/main.routes.ts';
import {config} from './config/main.config';

import {ApiConstant} from './services/Api.service';

import {mainComponent} from './components/main/main.component';
import {topNavbarComponent} from './components/top-navbar/top-navbar.component';


export const mainModule:IModule = angular.module('app.main', [])
    .config(routes)
    .config(config)

    .constant('Api', ApiConstant)

    .component('main', mainComponent)
    .component('topNavbar', topNavbarComponent);