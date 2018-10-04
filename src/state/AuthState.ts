import { CognitoUser } from "amazon-cognito-identity-js";

import UserAuthProperties from "../UserAuthProperties"

export default class AuthState {
    public user?: UserAuthProperties;

    constructor(user?: CognitoUser) {
        this.user = user && user.getSignInUserSession() ? {
            username: user.getUsername(),
            signInUserSession: {
                idToken: {
                    jwtToken: user.getSignInUserSession().getIdToken().getJwtToken(),
                }
            }
        } : null;
    }
}
