import {Store, Action} from "redux";
import axios from "axios";
import PersistOut from "./PersistOut";

export default (store:Store) =>
    (next:(action:Action<any>)=>void) =>
        (action:Action<any>) => {
            console.log("DatabasePersist", action);
            next(action);
            if(action.type === "NEW_TASK") {
                let authUser= (store.getState() as AppState).auth.user;
                console.log(authUser);
                axios.put(`${process.env.REACT_APP_PERSISTENCE_API_ENDPOINT}/users/data/${authUser.username}`,
                PersistOut(store.getState()),
                 {
                     headers: {
                         Authorization: `Bearer ${authUser.signInUserSession.idToken.jwtToken}`
                     }
                 }
                );
            }
        }