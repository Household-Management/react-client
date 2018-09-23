import {Action} from "redux";
import { CognitoUser } from "amazon-cognito-identity-js";

export default class AuthenticateUserAction implements Action<string> {
    static TYPE = "AUTHENTICATE_USER";
    public type = AuthenticateUserAction.TYPE;
    public user:CognitoUser;

    constructor(user:CognitoUser) {
        this.user = user;
    }
}