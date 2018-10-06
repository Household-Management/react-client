import {Action} from "redux";

import AuthenticateUserAction from "../actions/authenticate/AuthenticationCompleteAction";
import AuthState from "../state/AuthState";

export default (state: AuthState|null|undefined, action: Action<any>) => {
    if (state === undefined) {
        return null;
    }
    if (action.type === AuthenticateUserAction.ACTION_TYPE) {
        return AuthenticateUserHandler((action as AuthenticateUserAction));
    }
    return state;
};

const AuthenticateUserHandler = (action: AuthenticateUserAction) => {
    return new AuthState(action.user);
};
