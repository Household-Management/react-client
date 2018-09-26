import AuthState from "../state/AuthState";
import {Action} from "redux";
import AuthenticateUserAction from "../actions/AuthenticateUserAction";

export default (state:AuthState, action:Action<any>) => {
    if(state === undefined) {
        return null;
    }
    if(action.type === AuthenticateUserAction.TYPE){
        return AuthenticateUserHandler(state, (action as AuthenticateUserAction));
    }
    return state;
}

const AuthenticateUserHandler = (state:AuthState, action:AuthenticateUserAction) => {
    return new AuthState(action.user);
};
