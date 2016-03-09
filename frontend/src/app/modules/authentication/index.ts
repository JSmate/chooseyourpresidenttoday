import {IModule} from 'angular';

import * as angular from 'angular';

//import {routes} from './config/authentication.routes';
import {config} from './config/authentication.config';
import {facebookLoginComponent} from './components/facebook-login/facebook-login.component';


export const authenticationModule:IModule = angular.module('app.authentication', ['satellizer'])
    //.config(routes)
    .config(config)
    .component('facebookLogin', facebookLoginComponent);

