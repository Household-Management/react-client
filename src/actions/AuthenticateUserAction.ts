import { CognitoUser } from "amazon-cognito-identity-js";
import {Action} from "redux";

export default class AuthenticateUserAction implements Action<string> {
    public static TYPE = "AUTHENTICATE_USER";
    public type = AuthenticateUserAction.TYPE;
    public user: CognitoUser;

    constructor(user: CognitoUser) {
        this.user = user;
    }
}
