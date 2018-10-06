"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_amplify_1 = require("aws-amplify");
const AuthenticationCompleteAction_1 = require("../authenticate/AuthenticationCompleteAction");
const LoginBegunAction_1 = require("../authenticate/LoginBegunAction");
exports.default = (email, password, history) => (dispatch) => {
    dispatch(Object.assign({}, new LoginBegunAction_1.default()));
    console.log("Triggering login.");
    return aws_amplify_1.Auth.signIn(email, password)
        .then((user) => {
        console.log("Signed in successfully.");
        dispatch(Object.assign({}, new AuthenticationCompleteAction_1.default(user)));
        history.replace("/tasks");
    }).catch((err) => {
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
};
