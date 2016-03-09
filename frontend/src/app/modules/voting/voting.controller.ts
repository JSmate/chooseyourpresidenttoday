import {CandidateResource} from './models/candidate-resource.model';
import {CandidateResourceClass} from './models/candidate-resource.model';

export class VotingController {
    public candidates:CandidateResource[];

    constructor(private Candidate:CandidateResourceClass) {
        'ngInject';
    }

    private $onInit() {
        this.candidates = this.Candidate.query();
    }

    public onCandidateClick(candidate:CandidateResource) {
        console.log(candidate);
    }
}