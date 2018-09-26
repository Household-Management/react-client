import * as React from "react";
import {Grid, Button} from "@material-ui/core";
import { connect } from "react-redux";
import AppState from "appState";
import ProtectedRoute from "../state/ProtectedRoute";

@ProtectedRoute("/login")
export class TasksView extends React.Component<TasksViewProps, TasksViewState> {

  render () {
    return(<Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={12}
      >
        <Grid item>
          <div>
            <Button color="primary">
              Add Task
            </Button>
          </div>
        </Grid>
      </Grid>)
  }
}

class TasksViewProps {
  tasks:Task[];
}

class TasksViewState{
  showModal:boolean;
}

const connected = connect((appState:AppState)=>{
  console.log("TaskView connect", appState);
  return appState;
})(TasksView);

export default connected;
