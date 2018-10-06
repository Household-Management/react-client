import {Action} from "redux";

import AppStatus from "../state/AppStatus";
import LoginBegunAction from "../actions/authenticate/LoginBegunAction";

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
    
    return state;
}