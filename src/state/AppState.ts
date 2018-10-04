import AuthState from "./AuthState";
import UserState from "./user/UserState";

export default interface AppState {
    auth: AuthState;
    userData: UserState;
}
