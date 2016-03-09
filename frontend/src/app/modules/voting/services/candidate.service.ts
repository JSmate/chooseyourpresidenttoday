import {Candidate} from '../components/candidate/candidate.model';
import {CandidateResourceClass} from '../models/candidate-resource.model';
'use strict';

export function CandidateService ($resource, Api):CandidateResourceClass {
    'ngInject';

    return $resource(Api.base + Api.candidate,
        {id: '@id'}, {

        }) as CandidateResourceClass;
}