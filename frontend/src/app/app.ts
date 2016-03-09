require('jquery');
var angular:any = require('angular');

if(ON_TEST) {
    require('angular-mocks');
}

require('bootstrap-sass');

//angular dependencies
require('angular-resource');
require('angular-ui-router');
require('angular-sanitize');
require('angular-animate');
require('angular-ui-bootstrap');
require('angular-loading-bar');

//styles
require('angular-loading-bar/build/loading-bar.css');
require('./modules/main/assets/sass/styles.scss');

//modules
import {mainModule} from './modules/main/index';
import {homeModule} from './modules/home/index';
import {votingModule} from './modules/voting/index';

//Start by defining the main module and adding the module dependencies
angular.module('app', [
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngAnimate',
    'ui.bootstrap',
    'angular-loading-bar',

    mainModule.name,
    homeModule.name,
    votingModule.name
]);

//Then define the init function for starting up the application
if(!ON_TEST) {
    angular.element(document).ready(function () {

        var angularContainer = document.body;
        //Then init the app
        angular.bootstrap(angularContainer, ['app'], {strictDi: true});
    });
}
