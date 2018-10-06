import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import {History, Location} from "history";
import * as React from "react";
import { connect } from "react-redux";
import {match, RouteComponentProps, StaticContext, withRouter} from "react-router";
import {Dispatch} from "redux";

import {Button, Grid, TextField} from "@material-ui/core";

import login from "../actions/login";
import AppState from "../state/AppState";

export class LoginView extends React.Component<LoginViewProps & LoginViewActions, LoginViewState> {
    constructor(props: LoginViewProps & LoginViewActions) {
        super(props);
        this.state = {};
        this.signIn = this.signIn.bind(this);
    }

    public render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={24}
            >
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <TextField required
                            label={this.state.emailInputMessage || "Email"}
                            placeholder="Email"
                            error={!!this.state.emailInputMessage}
                            onChange={(event: any) => {
                                this.setState({
                                    email: event.target.value,
                                        lastUpdatedProperty: "email",
                                    });
                                }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <TextField required
                            label={this.state.passwordInputMessage
                                || "Password"}
                            placeholder="Password" type="password"
                                   error={!!this.state.passwordInputMessage}
                                   onChange={(event: any) => {
                                       this.setState({
                                            lastUpdatedProperty: "password",
                                            password: event.target.value,
                                       });
                                   }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <Button variant="contained" color="primary"
                                onClick={this.signIn}>{this.state.signInStatus || "Log In"}</Button>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <Button variant="contained" color="primary"
                                onClick={() => {
                                    this.props.history.push("/signup");
                                }}>Not yet a user? Sign up</Button>
                    </div>
                </Grid>
            </Grid>
        );
    }

    private signIn() {
        
        if (this.state.email && this.state.password) {
            this.setState({
               emailInputMessage: undefined,
               passwordInputMessage: undefined,
            });
            this.setState({
                signInStatus: "Signing In...",
            });
            this.props.login(this.state.email, this.state.password);
        }
    }
}

interface LoginViewProps extends RouteComponentProps {
    history: History;
    location: Location;
    match: match<any>;
    staticContext?: StaticContext;
}

interface LoginViewActions {
    login: (email: string, password: string) => void;
    authenticate: (user: CognitoUser) => void;
}

interface LoginViewState {
    lastUpdatedProperty?: string;
    email?: string;
    emailInputMessage?: string;
    password?: string;
    passwordInputMessage?: string;
    signInStatus?: string;
}

const connected = connect((state: AppState, ownProps: any) => {
    return {...state, ...ownProps};
}, (dispatch: Dispatch, ownProps: any) => {
    return {
        login: (email:string, password:string) => {
            return dispatch(login(email, password, ownProps.history));
        }
    };
})(LoginView);

export default withRouter(connected);
