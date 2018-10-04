import axios from "axios";
import {Action, Store} from "redux";
import {CognitoUser} from "amazon-cognito-identity-js";

import AppState from "../AppState";
import PersistOut from "./PersistOut";
import UserAuthProperties from "../UserAuthProperties";

export default (store: Store) =>
    (next: (action: Action<any>) => void) =>
        (action: Action<any>) => {
            next(action);
            if (action.type === "NEW_TASK") {
                const authUser:UserAuthProperties = (store.getState() as AppState).auth.user!;
                if (authUser) {
                    const userSession = authUser.signInUserSession;
                    if (userSession) {
                        console.log(userSession.idToken.jwtToken);
                        // tslint:disable-next-line:max-line-length
                        axios.put(`${process.env.REACT_APP_PERSISTENCE_API_ENDPOINT}/users/data/${authUser.username}`,
                        store.getState().userData,
                            {
                                headers: {
                                    Authorization: `Bearer ${userSession.idToken.jwtToken}`,
                                },
                            });
                    } else {
                        console.warn("User session was not defined.");
                    }
                } else {
                    console.warn("User was not defined.");
                }
            }
        };
