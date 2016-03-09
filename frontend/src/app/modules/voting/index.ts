require('./assets/sass/styles.scss');

import {IModule} from 'angular';

import * as angular from 'angular';

import {routes} from './config/voting.routes';

import {CandidateService} from './services/candidate.service';
import {votingComponent} from './voting.component';
import {candidateComponent} from './components/candidate/candidate.component';
import {candidatesComponent} from './components/candidate/candidates.component';

export const votingModule:IModule = angular.module('app.voting', [])
    .config(routes)

    .factory('Candidate', CandidateService)

    .component('voting', votingComponent)
    .component('candidate', candidateComponent)
    .component('candidates', candidatesComponent);