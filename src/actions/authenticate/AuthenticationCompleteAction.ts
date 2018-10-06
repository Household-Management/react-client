import {Action} from "redux";

export default class AuthenticationCompleteAction implements Action<string> {
    public static ACTION_TYPE = "AUTHENTICATION_COMPLETE";
    public type = AuthenticationCompleteAction.ACTION_TYPE;
    public user: CognitoUser;

    constructor(user: CognitoUser) {
        this.user = user;
    }
}