import {Candidate} from './components/candidate/candidate.model';

export class VotingController {
    public candidates:Candidate[];

    constructor(private Candidate) {
        'ngInject';
    }

    private $onInit() {
        this.candidates = this.Candidate.query();
    }

    public onCandidateClick(candidate:Candidate) {
        console.log(candidate);
    }
}