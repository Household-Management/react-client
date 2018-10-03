import { CognitoUser } from "amazon-cognito-identity-js";

export default class AuthState {
    public user?: CognitoUser;

    constructor(user?: CognitoUser) {
        this.user = user;
    }
}
