export default class Task {
  constructor(title:string, created:Date, due:Date){
    this.title = title;
    this.created = created;
    this.due = due;
  }
  /**
   * The title of the task.
   */
  public title:string;
  /**
   * When the task was created.
   */
  public created:Date;
  /**
   * The time and date when the task needs to be completed.
   */
  public due:Date;
}
