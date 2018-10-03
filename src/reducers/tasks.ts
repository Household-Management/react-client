import { Action } from "redux";
import TaskState from "../state/TaskState";
import NewTaskAction from "../actions/NewTaskAction";

export default (state:TaskState|undefined, action:Action<any>) => {
  if (state === undefined) {
    return new TaskState();
  }
  if (action.type === NewTaskAction.ACTION_TYPE) {
    const newTaskAction = (action as NewTaskAction);
    state.tasks.push(newTaskAction.task);
  }
  return {...state};
}
