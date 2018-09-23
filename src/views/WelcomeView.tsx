import * as React from "react";
import {Component} from "react"
import {Grid, Button} from "@material-ui/core";

export default class WelcomeView extends Component {
    render() {
        return (<Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12}>
                <div style={{textAlign: "center"}}>Welcome Home</div>
            </Grid>
            <Grid item xs={12}>
                <div style={{textAlign: "center"}}>
                    <img src={"https://via.placeholder.com/256x256"}></img>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div>
                    <Button variant="contained" color="primary" fullWidth>Log In</Button>
                </div>
            </Grid>
        </Grid>);
    }
}