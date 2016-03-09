export class CandidatesController {
    private onClick:any;

    constructor() {

    }

    click(candidate) {
        this.onClick({candidate});
    }
}