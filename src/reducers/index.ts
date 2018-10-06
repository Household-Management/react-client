import {combineReducers} from "redux";

import auth from "./auth";
import userData from "./userData";
import status from "./status";

export default combineReducers({
    auth,
    userData,
    status,
});
