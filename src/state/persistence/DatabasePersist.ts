import {Store, Action} from "redux";
import axios from "axios";
import PersistOut from "./PersistOut";
import AppState from "../AppState";

export default (store:Store) =>
    (next:(action:Action<any>)=>void) =>
        (action:Action<any>) => {
            console.log("DatabasePersist", action);
            next(action);
            if(action.type === "NEW_TASK") {
                const authUser= (store.getState() as AppState).auth.user!;
                if(authUser){
                    const userSession = authUser.getSignInUserSession();
                    if (userSession) {
                        axios.put(`${process.env.REACT_APP_PERSISTENCE_API_ENDPOINT}/users/data/${authUser.getUsername()}`,
                        PersistOut(store.getState()),
                            {
                                headers: {
                                    Authorization: `Bearer ${userSession.getIdToken().getJwtToken()}`
                                }
                            });
                    } else {
                        console.warn("User session was not defined.");
                    }
                } else {
                    console.warn("User was not defined.")
                }
            }
        }