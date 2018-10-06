import AuthState from "./AuthState";
import UserState from "./user/UserState";
import AppStatus from "./AppStatus";

export default interface AppState {
    auth: AuthState;
    userData: UserState;
    status:AppStatus;
}
