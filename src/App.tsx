import {Component} from 'react';
import * as React from "react";
import './App.css';
import {Route} from "react-router-dom";
import WelcomeView from "./views/WelcomeView";
import LoginView from "./views/LoginView";
import SignUpView from "./views/SignUpView";
import TasksView from "./views/TasksView";
import MissingView from "./views/MissingView";
import {Switch} from "react-router";
import { Auth } from "aws-amplify";
import * as AwsExports from "./aws-exports";

Auth.configure(AwsExports);

class App extends Component {
    render() {
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
