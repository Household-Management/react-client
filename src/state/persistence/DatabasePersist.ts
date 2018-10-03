import axios from "axios";
import {Action, Store} from "redux";

import AppState from "../AppState";
import PersistOut from "./PersistOut";

export default (store: Store) =>
    (next: (action: Action<any>) => void) =>
        (action: Action<any>) => {
            next(action);
            if (action.type === "NEW_TASK") {
                const authUser = (store.getState() as AppState).auth.user!;
                if (authUser) {
                    const userSession = authUser.getSignInUserSession();
                    if (userSession) {
                        // tslint:disable-next-line:max-line-length
                        axios.put(`${process.env.REACT_APP_PERSISTENCE_API_ENDPOINT}/users/data/${authUser.getUsername()}`,
                        PersistOut(store.getState()),
                            {
                                headers: {
                                    Authorization: `Bearer ${userSession.getIdToken().getJwtToken()}`,
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
