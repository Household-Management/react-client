import { CognitoUser } from "amazon-cognito-identity-js";

export default class AuthState{

    constructor(user?:CognitoUser) {
        this.user = user;
    }

    public user?:CognitoUser;
}