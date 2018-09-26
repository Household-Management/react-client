import auth from "./auth";
import tasks from "./tasks";
import {combineReducers} from "redux";

export default combineReducers({
    auth,
    tasks
});
