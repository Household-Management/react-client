import {Button, Grid} from "@material-ui/core";
import {History, Location} from "history";
import * as React from "react";
import {Component} from "react";
import {match, RouteComponentProps, StaticContext, withRouter} from "react-router";

class WelcomeView extends Component<WelcomeViewProps> {
    public render() {
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
                    onClick={() => {
                        this.props.history.push("/login");
                    }}>Log In</Button>
                </div>
            </Grid>
        </Grid>);
    }
}

interface WelcomeViewProps extends RouteComponentProps {
    history: History;
    location: Location;
    match: match<any>;
    staticContext?: StaticContext;
}

export default withRouter(WelcomeView);
