import {combineReducers} from "redux";

import auth from "./auth";
import tasks from "./tasks";

export default combineReducers({
    auth,
    tasks,
});
