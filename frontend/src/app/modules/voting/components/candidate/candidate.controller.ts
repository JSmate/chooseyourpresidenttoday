import {Candidate} from './candidate.model';

export class CandidateController {
    //bindings
    private candidate:Candidate;
    private onClick:any;

    constructor() {
        'ngInject';
    }

    click() {
        this.onClick({candidate: this.candidate});
    }
}