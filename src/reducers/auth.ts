import {Action} from "redux";

import AuthenticateUserAction from "../actions/AuthenticateUserAction";
import AuthState from "../state/AuthState";

export default (state: AuthState|null|undefined, action: Action<any>) => {
    if (state === undefined) {
        return null;
    }
    if (action.type === AuthenticateUserAction.TYPE) {
        return AuthenticateUserHandler((action as AuthenticateUserAction));
    }
    return state;
};

const AuthenticateUserHandler = (action: AuthenticateUserAction) => {
    return new AuthState(action.user);
};
