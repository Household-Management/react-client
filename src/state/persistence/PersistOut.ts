import AppState from "../AppState";

export default (appState:AppState) => {
    return {
        user: appState.auth.user!.getUsername(),
        tasks: appState.tasks
    }
};