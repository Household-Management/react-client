import {Action} from "redux";

import Task from "../state/tasks/Task";

export default class RemoveTaskAction implements Action<string> {
    public static ACTION_TYPE = "REMOVE_TASK";
    public type = RemoveTaskAction.ACTION_TYPE;
    public task: Task;

    constructor(task: Task) {
        this.task = task;
    }
}
