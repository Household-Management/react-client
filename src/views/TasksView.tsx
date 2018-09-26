import * as React from "react";
import {Grid, Button} from "@material-ui/core";

export default class TasksView extends React.Component {
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
              Create new Task
            </Button>
          </div>
        </Grid>
      </Grid>)
  }
}
