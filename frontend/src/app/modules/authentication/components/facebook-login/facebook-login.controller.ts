export class FacebookLoginController {
    constructor(private $auth) {
        'ngInject';

    }

    public authenticate(provider:string) {
        this.$auth.authenticate(provider);
    }
}