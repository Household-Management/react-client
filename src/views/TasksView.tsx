import * as React from "react";
import {Grid, Button, TextField} from "@material-ui/core";
import { connect } from "react-redux";
import AppState from "../state/AppState";
import ProtectedRoute from "../state/AuthenticatedRoute";
import * as Modal from "react-modal";

@ProtectedRoute("/login")
export class TasksView extends React.Component<TasksViewProps, TasksViewState> {

  constructor (props:any) {
    super(props);
    this.state = {
      showModal: false
    };
    this.showNewTaskModal = this.showNewTaskModal.bind(this);
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

  render () {
    return(<React.Fragment>
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={16}
      >
        <Grid item>
          <div>
            <Button color="primary" onClick={this.showNewTaskModal}>
              Add Task
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
          <Grid item xs={12}>
            <TextField
              placeholder="Title"
              fullWidth>
            </TextField>
          </Grid>
        </Grid>
      </Modal>
    </React.Fragment>
    )
  }
}

class TasksViewProps {
  tasks:Task[];
}

class TasksViewState{
  showModal:boolean;
  newTask?:Task;
}

const connected = connect((appState:AppState)=>{
  return appState;
})(TasksView);

export default connected;
