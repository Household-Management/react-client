import {CognitoUser, ISignUpResult} from "amazon-cognito-identity-js";
import {Auth} from "aws-amplify";
import {History, Location} from "history";
import * as React from "react";
import {connect} from "react-redux";
import {match, RouteComponentProps, StaticContext, withRouter} from "react-router";
import {Dispatch} from "redux";

import {Button, Grid, TextField} from "@material-ui/core";

import AuthenticateUserAction from "../actions/AuthenticateUserAction";
import AppState from "../state/AppState";

export class SignUpView extends React.Component<SignUpViewProps & SignUpViewActions, SignUpViewState> {
    public constructor(props: SignUpViewProps & SignUpViewActions) {
        super(props);
        this.state = {};
        this.signUp = this.signUp.bind(this);
        this.validate = this.validate.bind(this);
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
                        <TextField required label={this.state.emailInputMessage || "Email"} placeholder="Email"
                                   error={!!this.state.emailInputMessage}
                                   onChange={(event: any) => {
                                       this.setState({
                                           email: event.target.value,
                                           lastUpdatedProperty: "email",
                                       }, this.validate);
                                   }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <TextField required label={this.state.passwordInputMessage || "Password"}
                                   placeholder="Password"
                                   type="password"
                                   error={!!this.state.passwordInputMessage}
                                   onChange={(event: any) => {
                                       this.setState({
                                            lastUpdatedProperty: "password",
                                            password: event.target.value,
                                       }, this.validate);
                                   }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <TextField required label={this.state.passwordConfirmInputMessage || "Password Confirmation"}
                                   placeholder="Confirm Password" type="password"
                                   error={!!this.state.passwordConfirmInputMessage}
                                   onChange={(event: any) => {
                                       this.setState({
                                            lastUpdatedProperty: "passwordConfirm",
                                            passwordConfirm: event.target.value,
                                       }, this.validate);
                                   }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <Button variant="contained" color="primary"
                                onClick={this.signUp}>{this.state.signInStatus || "Sign Up"}</Button>
                    </div>
                </Grid>
            </Grid>
        );
    }

    private validate() {
        switch (this.state.lastUpdatedProperty) {
            case "password":
            case "passwordConfirm":
                if (this.state.password !== this.state.passwordConfirm) {
                    this.setState({
                        passwordConfirmInputMessage: "Password and password confirmation don't match.",
                    });
                } else {
                    this.setState({
                        passwordConfirmInputMessage: undefined,
                    });
                }
                break;
            case "email":
                if (!this.state.email) {
                    this.setState({
                        emailInputMessage: "Please enter your email.",
                    });
                } else {
                    this.setState({
                        emailInputMessage: undefined,
                    });
                }
            default:
                console.error("No matching case for lastUpdatedProperty", this.state.lastUpdatedProperty);
        }
        const valid = this.state.email && this.state.password && (this.state.password === this.state.passwordConfirm);
        return valid;
    }

    private signUp() {
        if (this.validate()) {
            this.setState({
                emailInputMessage: undefined,
                passwordConfirmInputMessage: undefined,
                passwordInputMessage: undefined,
            });
            this.setState({
                signInStatus: "Signing In...",
            });
            Auth.signIn(this.state.email!, "foobar").then(() => {
                throw new Error("Whoops");
            }).catch((err: any) => {
                console.error(err);
                switch (err.code) {
                    case "NotAuthorizedException":
                    case "UserNotConfirmedException":
                        this.setState({
                            emailInputMessage: "This email is already in use.",
                            signInStatus: undefined,
                        });
                        break;
                    case "UserNotFoundException":
                        console.info("Creating new user");
                        return Auth.signUp({
                            attributes: {
                                email: this.state.email!,
                            },
                            password: this.state.password!,
                            username: this.state.email!,
                        }).catch((userError: any) => {
                            console.error(userError);
                        });
                    default:
                        console.error("No error should reach here", err);
                }
            }).then((userCreationResult: void|ISignUpResult) => {
                if (userCreationResult) {
                    console.info("User creation complete");
                    this.setState({
                        signInStatus: undefined,
                    });
                    this.props.authenticate(userCreationResult.user);
                    console.info("Naigating to home");
                    this.props.history.replace("/tasks");
                } else {
                    console.error("Something went wrong when signing up.");
                }
                return userCreationResult;
            });
        }
    }
}

interface SignUpViewProps extends RouteComponentProps {
    history: History;
    location: Location;
    match: match<any>;
    staticContext?: StaticContext;
}

interface SignUpViewActions {
    authenticate: (user: CognitoUser) => void;
}

interface SignUpViewState {
    lastUpdatedProperty?: string;
    email?: string;
    emailInputMessage?: string;
    password?: string;
    passwordInputMessage?: string;
    passwordConfirm?: string;
    passwordConfirmInputMessage?: string;
    signInStatus?: string;
}

const connected = connect((state: any, ownProps: any) => {
    return {...state, ...ownProps};
}, (dispatch: Dispatch, ownProps: any) => {
  return {
    authenticate: (user: CognitoUser) => {
      dispatch({...new AuthenticateUserAction(user)});
    },
  };
})(SignUpView);

export default withRouter(connected);
