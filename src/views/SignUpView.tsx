import {match, RouteComponentProps, StaticContext, withRouter} from "react-router";
import {History, Location} from "history";
import Grid from "@material-ui/core/Grid";
import * as React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Auth} from "aws-amplify";
import {CognitoUser, ISignUpResult} from "amazon-cognito-identity-js";
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
        console.info("Validating");
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
        let valid = this.state.email && this.state.password && (this.state.password === this.state.passwordConfirm);
        console.info(valid ? "Valid" : "Invalid");
        return valid;
    }


    signUp() {
        if (this.validate()) {
            this.setState({
                emailInputMessage: undefined,
                passwordInputMessage: undefined,
                passwordConfirmInputMessage: undefined
            });
            this.setState({
                signInStatus: "Signing In..."
            });
            console.info("Checking if user already exists")
            Auth.signIn(this.state.email, "foobar").then(result => {
                throw new Error("Whoops");
            }).catch(err => {
                console.error(err);
                switch (err.code) {
                    case "NotAuthorizedException":
                    case "UserNotConfirmedException":
                        this.setState({
                            signInStatus: undefined,
                            emailInputMessage: "This email is already in use."
                        })
                        break;
                    case "UserNotFoundException":
                        console.info("Creating new user");
                        return Auth.signUp({
                            username: this.state.email!,
                            password: this.state.password!,
                            attributes: {
                                email: this.state.email!
                            }
                        }).catch(err => {
                            console.error(err);
                        })
                }
            }).then((userCreationResult?: ISignUpResult) => {
                if (userCreationResult) {
                    console.info("User creation complete");
                    this.setState({
                        signInStatus: undefined
                    });
                    this.props.authenticate(userCreationResult.user);
                    console.info("Naigating to home");
                    this.props.history.replace("/home");
                } else {
                    console.error("Something went wrong when signing up.");
                }
            })
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
                        <TextField required label={this.state.passwordConfirmInputMessage || "Password Confirmation"}
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
                                onClick={this.signUp}>{this.state.signInStatus || "Sign Up"}</Button>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

interface SignUpViewProps
    implements RouteComponentProps {
    history: History;
    location: Location;
    match: match<any>;
    staticContext?: StaticContext;
}

interface SignUpViewActions {
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
}, (dispatch:Dispatch, ownProps:any)=>{
  return {
    authenticate: (user:CognitoUser) => {
      dispatch({...new AuthenticateUserAction(user)})
    }
  }
})(SignUpView);

export default withRouter(connected);
