import {CognitoUserSession} from "amazon-cognito-identity-js";

export default interface UserAuthProperties {
    username: string;
    signInUserSession: {
        idToken: {
            jwtToken: string
        }
    };
}