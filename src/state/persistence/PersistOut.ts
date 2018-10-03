export default (appState:AppState) => {
    return {
        user: appState.auth.user.username,
        tasks: appState.tasks
    }
};