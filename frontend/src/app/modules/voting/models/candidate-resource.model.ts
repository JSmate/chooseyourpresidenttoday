import IResource = angular.resource.IResource;
import {Candidate} from '../components/candidate/candidate.model';
import IResourceClass = angular.resource.IResourceClass;

export interface CandidateResource extends IResource<Candidate> {

}

export interface CandidateResourceClass extends IResourceClass<Candidate> {

}