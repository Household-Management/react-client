import * as React from "react";
import {Component, Context} from "react"
import {Grid, Button} from "@material-ui/core";
import WithRouter from "./WithRouter";
import {match, RouteComponentProps, StaticContext} from "react-router";
import {History, Location} from "history";

@WithRouter
export default class WelcomeView extends Component<WelcomeViewProps> {
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
                    <Button variant="contained" color="primary" fullWidth
                    onClick={()=>{
                        this.props.history.push("/login");
                    }}>Log In</Button>
                </div>
            </Grid>
        </Grid>);
    }
}

class WelcomeViewProps implements RouteComponentProps{
    history: History;
    location: Location;
    match: match<any>;
    staticContext?: StaticContext;
}