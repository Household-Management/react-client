import AppState from "../AppState";

export default (appState: AppState) => {
    return {
        tasks: appState.tasks,
        user: appState.auth.user!.getUsername(),
    };
};
