import { CognitoUser } from "amazon-cognito-identity-js";
import {Action} from "redux";

export default class AuthenticateUserAction implements Action<string> {
    public static TYPE = "AUTHENTICATE_USER"; //TODO: Refactor, should be ACTION_TYPE.
    public type = AuthenticateUserAction.TYPE;
    public user: CognitoUser;

    constructor(user: CognitoUser) {
        this.user = user;
    }
}
