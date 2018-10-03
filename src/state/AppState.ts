import AuthState from "./AuthState";
import TaskState from "./TaskState";

export default interface AppState{
    auth:AuthState;
    tasks:TaskState;
}
