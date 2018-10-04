import {Action} from "redux";
import UserState from "../state/user/UserState";

export default class LoadUserDataAction implements Action<string> {
    public static ACTION_TYPE = "LOAD_USER_DATA";
    public type = LoadUserDataAction.ACTION_TYPE;
    public userData: UserState;
    
    constructor(userData: UserState) {
        this.userData = userData;
    }
}