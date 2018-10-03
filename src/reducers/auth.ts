import AuthState from "../state/AuthState";
import {Action} from "redux";
import AuthenticateUserAction from "../actions/AuthenticateUserAction";

export default (state:AuthState|null|undefined, action:Action<any>) => {
    if(state === undefined) {
        return null;
    }
    if(action.type === AuthenticateUserAction.TYPE){
        return AuthenticateUserHandler((action as AuthenticateUserAction));
    }
    return state;
}

const AuthenticateUserHandler = (action:AuthenticateUserAction) => {
    return new AuthState(action.user);
};
