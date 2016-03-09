import {Candidate} from '../components/candidate/candidate.model';
'use strict';

export function CandidateService () {
    const _query = function ():Candidate[] {
        return [{
            firstname: 'Donald Trump',
            lastname: 'Trump',
            image: 'http://inthesetimes.com/images/articles/trump_flicker_face_yess.jpg'
        }];
    };

    return {
        query: _query
    }
}