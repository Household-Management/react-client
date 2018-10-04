import { Auth } from "aws-amplify";
import * as React from "react";
import {Component} from "react";
import {Switch} from "react-router";
import {Route} from "react-router-dom";

import LoginView from "./views/LoginView";
import MissingView from "./views/MissingView";
import SignUpView from "./views/SignUpView";
import TasksView from "./views/TasksView";
import WelcomeView from "./views/WelcomeView";

import "./App.css";
// tslint:disable-next-line:no-var-require
import * as AwsExports from "./aws-exports";

console.log("Auth configure", AwsExports);
Auth.configure((AwsExports as any).default);

class App extends Component {
    public render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={WelcomeView} exact/>
                    <Route path="/login" component={LoginView}/>
                    <Route path="/signup" component={SignUpView}/>
                    <Route path="/tasks" component={TasksView}/>

                    <Route component={MissingView}/>
                </Switch>
            </div>
        );
    }
}

export default App;
