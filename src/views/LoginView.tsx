import {match, RouteComponentProps, StaticContext, withRouter} from "react-router";
import {History, Location} from "history";
import Grid from "@material-ui/core/Grid";
import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import AppState from "../state/AppState";
import {Dispatch} from "redux";
import { connect } from "react-redux";
import AuthenticateUserAction from "../actions/AuthenticateUserAction";

export class LoginView extends React.Component<LoginViewProps & LoginViewActions, LoginViewState> {
    constructor(props: LoginViewProps & LoginViewActions) {
        super(props);
        this.state = {};
        this.signIn = this.signIn.bind(this);
    }

    signIn() {
        if(this.state.email && this.state.password) {
            this.setState({
               emailInputMessage: undefined,
               passwordInputMessage: undefined
            });
            this.setState({
                signInStatus: "Signing In..."
            });
            Auth.signIn(this.state.email!, this.state.password).then((user:CognitoUser)=>{
                this.setState({
                    signInStatus: undefined
                });
                this.props.authenticate(user);
            }).catch((err)=>{
                this.setState({
                    signInStatus: undefined
                });
                console.error(err);
                switch (err.code){
                    case "UserNotFoundException":
                        this.setState({
                            emailInputMessage: "User was not found"
                        });
                        break;
                    case "NotAuthorizedException":
                        this.setState({
                            passwordInputMessage: "Username and password were invalid"
                        });
                }
            });
        }
    }

    render() {
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
                        <TextField required label={this.state.emailInputMessage || "Email"} placeholder="Email"
                                   error={!!this.state.emailInputMessage}
                                   onChange={event => {
                                       this.setState({
                                           email: event.target.value,
                                           lastUpdatedProperty: "email"
                                       })
                                   }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <TextField required label={this.state.passwordInputMessage || "Password"} placeholder="Password" type="password"
                                   error={!!this.state.passwordInputMessage}
                                   onChange={event => {
                                       this.setState({
                                           password: event.target.value,
                                           lastUpdatedProperty: "password"
                                       })
                                   }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <Button variant="contained" color="primary"
                                onClick={this.signIn}>{this.state.signInStatus || "Log In"}</Button>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

class LoginViewProps implements RouteComponentProps {
    history: History;
    location: Location;
    match: match<any>;
    staticContext?: StaticContext;
}

class LoginViewActions {
    authenticate: (user:CognitoUser) => void
}

class LoginViewState {
    lastUpdatedProperty?: string;
    email?: string;
    emailInputMessage?: string;
    password?: string;
    passwordInputMessage?: string;
    signInStatus?:string;
}

const connected = connect((state:AppState, ownProps:any)=>{
    return {...state, ...ownProps};
}, (dispatch:Dispatch, ownProps:any) => {
    return {
        authenticate: (user:CognitoUser) => {
            console.log(user);
            dispatch({...new AuthenticateUserAction(user)})
        }
    }
})(LoginView);

export default withRouter(connected);