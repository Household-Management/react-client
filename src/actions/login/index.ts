import { Auth } from "aws-amplify";
import {Dispatch} from "redux";
import AuthenticationCompleteAction from "../authenticate/AuthenticationCompleteAction";
import {History} from "history";

import LoginBegunAction from "../authenticate/LoginBegunAction";

export default (email:string, password:string, history: History) => 
    (dispatch:Dispatch) => {
        dispatch({... new LoginBegunAction()});
        console.log("Triggering login.");
        return Auth.signIn(email!, password)
            .then((user: CognitoUser) => {
                console.log("Signed in successfully.");
                dispatch({... new AuthenticationCompleteAction(user)});
                history.replace("/tasks");
            }).catch((err: any) => {
                console.error(err);
                switch (err.code) {
                    case "UserNotFoundException":
                        this.setState({
                            emailInputMessage: "User was not found",
                        });
                        break;
                    case "NotAuthorizedException":
                        this.setState({
                            passwordInputMessage: "Username and password "
                            + "were invalid",
                        });
                }
            });
    }