import { Action } from "redux";
import TaskState from "../state/TaskState";
import NewTaskAction from "../actions/NewTaskAction";

export default (state:TaskState, action:Action<any>) => {
  if (state === undefined && action.type !== "persist/REHYDRATE") {
    console.log("Populate tasks", action.type);
    return new TaskState();
  }
  if (action.type === NewTaskAction.ACTION_TYPE) {
    const newTaskAction = (action as NewTaskAction);
    state.tasks.push(newTaskAction.task);
  }
  return {...state};
}
