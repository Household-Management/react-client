import AppState from "../AppState";
import UserState from "../user/UserState";

export default (appState: AppState) => {
    return {
        userData: appState.userData,
        user: appState.auth.user!.getUsername(),
    };
};
