import { Action } from "redux";
import TaskState from "../state/TaskState";

export default (state:TaskState, action:Action<any>) => {
  if(state === undefined){
    return new TaskState();
  }
  return state;
}
