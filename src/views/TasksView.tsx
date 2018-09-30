import * as React from "react";
import {Grid, Button, TextField, List, ListItem, ListItemText, Paper, IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import AppState from "../state/AppState";
import ProtectedRoute from "../state/AuthenticatedRoute";
import * as Modal from "react-modal";
import Task from "../state/tasks/Task";
import TaskAction from "../actions/NewTaskAction";

@ProtectedRoute("/login")
export class TasksView extends React.Component<TasksViewProps, TasksViewState> {

  constructor (props:any) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.showNewTaskModal = this.showNewTaskModal.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  showNewTaskModal () {
    this.setState({
      showModal: true
    });
  }

  hideNewTaskModal () {
    this.setState({
      showModal: false
    });
  }
  
  createTask() {
    this.props.createTask(new Task(this.state.taskTitle, 
      new Date(),
      this.state.taskDueDate));
    this.hideNewTaskModal();
  }
  
  shouldComponentUpdate(nextProps:any, nextState:any){
    return this.state.showModal !== nextState.showModal;
  }

  render () {
    return(<React.Fragment>
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      justifyContent="center"
      spacing={16}
      >
      {this.props.tasks.tasks.length > 0 && 
        <Grid item xs={12}>
          <Paper>
            <List component="nav">
              {this.props.tasks.tasks.map(task => {
                return (
                  <ListItem button>
                    <ListItemText primary={task.title}/>
                  </ListItem>)
              })}
            </List>
          </Paper>
        </Grid>}
        <Grid item xs={12}>
          <div style={{textAlign: "center"}}>
            <Button variant="fab" color="primary" onClick={this.showNewTaskModal}>
              <AddIcon />
            </Button>
          </div>
        </Grid>
      </Grid>
      <Modal
        isOpen={this.state.showModal}
        style={{width: "50%"}}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item  container xs={12}>
            <Grid item xs={12}>
              <div>Create new Task</div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                placeholder="Name"
                onChange={e => {this.setState({
                  taskTitle: e.target.value
                })}}>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
              type="datetime-local"
              onChange={e => {this.setState({
                  taskDueDate: new Date(Date.parse(e.target.value))
                })}}/>
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <Button color="primary" variant="contained" onClick={this.createTask}>Create</Button>
          </Grid>
        </Grid>
      </Modal>
    </React.Fragment>
    )
  }
}

interface TasksViewProps {
  tasks:Task[];
}

interface TasksViewState{
  showModal:boolean;
  taskTitle?:string;
  taskDueDate?:Date;
}

const connected = connect((appState:AppState)=>{
  return appState;
}, (dispatch: Dispatch) => {
  return {
    createTask: (task :Task) => {
      dispatch({... new TaskAction(task)});
    },
  }
})(TasksView);

export default connected;
