import {Component} from 'react';
import * as React from "react";
import './App.css';
import {Route} from "react-router-dom";
import WelcomeView from "./views/WelcomeView";
import LoginView from "./views/LoginView";
import {Switch} from "react-router";
import { Auth } from "aws-amplify";
import AwsExports from "./aws-exports";

Auth.configure(AwsExports);

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={WelcomeView} exact/>
                    <Route path="/login" component={LoginView}/>
                </Switch>
            </div>
        );
    }
}

export default App;
