import {Action} from "redux";

import AppStatus from "../state/AppStatus";
import LoginBegunAction from "../actions/authenticate/LoginBegunAction";
import AuthenticationCompleteAction from "../actions/authenticate/AuthenticationCompleteAction";

export default (state:{}|undefined, action:Action<string>) => {
    if (state === undefined) {
        return {};
    }
    
    if (action.type === LoginBegunAction.ACTION_TYPE) {
        return {
            message: "Logging you in...",
            status: "normal",
            statusModalOpen: true
        }
    }
    
    if (action.type === AuthenticationCompleteAction.ACTION_TYPE) {
        return {};
    }
    
    return state;
}