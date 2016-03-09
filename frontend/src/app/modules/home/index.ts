import {IModule} from 'angular';

import * as angular from 'angular';

import {routes} from './config/main.routes.ts';
import {homeComponent} from './components/home/home.component';

export const homeModule:IModule = angular.module('app.home', [])
    .config(routes)

    .component('home', homeComponent);