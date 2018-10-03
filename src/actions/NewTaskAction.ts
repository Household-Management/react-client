import {Action} from "redux";

import Task from "../state/tasks/Task";

export default class NewTaskAction implements Action<string> {
    public static ACTION_TYPE = "NEW_TASK";

    public task: Task;
    public type = NewTaskAction.ACTION_TYPE;

    constructor(task: Task) {
        this.task = task;
    }
}
