import Task from "../state/tasks/Task";
import {Action} from "redux";

export default class NewTaskAction implements Action<string>{
    public static ACTION_TYPE = "NEW_TASK"
    
    public task: Task;
    public type = NewTaskAction.ACTION_TYPE;
    
    constructor(task:Task) {
        this.task = task;
    }
}