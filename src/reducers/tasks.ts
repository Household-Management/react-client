import { Action } from "redux";

import NewTaskAction from "../actions/NewTaskAction";
import RemoveTaskAction from "../actions/RemoveTaskAction";
import TaskState from "../state/TaskState";
import Task from "../state/tasks/Task";

export default (state: TaskState|undefined, action: Action<any>) => {
  if (state === undefined) {
    return new TaskState();
  }
  if (action.type === NewTaskAction.ACTION_TYPE) {
    const newTaskAction = (action as NewTaskAction);
    state.tasks.push(newTaskAction.task);
  }
  if (action.type === RemoveTaskAction.ACTION_TYPE) {
    const removeTaskAction = (action as RemoveTaskAction);
    state.tasks === state.tasks.filter((task: Task) => {
      return task !== removeTaskAction.task;
    });
  }
  
  return {...state};
};
