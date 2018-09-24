import {match, RouteComponentProps, StaticContext, withRouter} from "react-router";
import {History, Location} from "history";
import Grid from "@material-ui/core/Grid";
import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Auth} from "aws-amplify";
import {CognitoUser} from "amazon-cognito-identity-js";
import AppState from "../state/AppState";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import AuthenticateUserAction from "../actions/AuthenticateUserAction";

export class SignUpView extends React.Component<SignUpViewProps & SignUpViewActions, SignUpViewState> {
    constructor(props: SignUpViewProps & SignUpViewActions) {
        super(props);
        this.state = {};
        this.signUp = this.signUp.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate() {
        switch (this.state.lastUpdatedProperty) {
            case "password":
            case "passwordConfirm":
                if (this.state.password !== this.state.passwordConfirm) {
                    this.setState({
                        passwordConfirmInputMessage: "Password and password confirmation don't match."
                    })
                } else {
                    this.setState({
                        passwordConfirmInputMessage: undefined
                    })
                }
                break;
            case "email":
                if (!this.state.email) {
                    this.setState({
                        emailInputMessage: "Please enter your email."
                    })
                } else {
                    this.setState({
                        emailInputMessage: undefined
                    })
                }
        }
    }


    signUp() {
        if (this.state.email && this.state.password && this.state.password === this.state.passwordConfirm) {
            if (this.state.email && this.state.password) {
                this.setState({
                    emailInputMessage: undefined,
                    passwordInputMessage: undefined,
                    passwordConfirmInputMessage: undefined
                });
                this.setState({
                    signInStatus: "Signing In..."
                });
                Auth.signIn(this.state.email, "")
                    .catch(error => {
                        return error;
                    }).then((existingUserResult) => {
                    if (existingUserResult.code !== "UserNotFoundException") {
                        return Auth.signUp({
                            username: this.state.email!,
                            password: this.state.password!
                        });
                    }
                }).then((userCreationResult: any) => {
                    this.setState({
                        signInStatus: undefined
                    });
                    this.props.authenticate(userCreationResult.user);
                    this.props.history.replace("/home");
                })

            }
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
                                       }, this.validate)
                                   }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <TextField required label={this.state.passwordInputMessage || "Password"}
                                   placeholder="Password"
                                   type="password"
                                   error={!!this.state.passwordInputMessage}
                                   onChange={event => {
                                       this.setState({
                                           password: event.target.value,
                                           lastUpdatedProperty: "password"
                                       }, this.validate)
                                   }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <TextField required label={this.state.passwordConfirmInputMessage || "Password"}
                                   placeholder="Confirm Password" type="password"
                                   error={!!this.state.passwordConfirmInputMessage}
                                   onChange={event => {
                                       this.setState({
                                           passwordConfirm: event.target.value,
                                           lastUpdatedProperty: "passwordConfirm"
                                       }, this.validate)
                                   }}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "center"}}>
                        <Button variant="contained" color="primary"
                                onClick={this.signIn}>{this.state.signInStatus || "Sign Up"}</Button>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

class SignUpViewProps
    implements RouteComponentProps {
    history: History;
    location: Location;
    match: match<any>;
    staticContext?: StaticContext;
}

class SignUpViewActions {
    authenticate: (user: CognitoUser) => void
}

class SignUpViewState {
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
})(SignUpView);

export default withRouter(connected);