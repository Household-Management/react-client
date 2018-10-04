import axios from "axios";
import {AxiosResponse} from "axios";
import {Action, Store} from "redux";

import AppState from "../AppState";
import PersistOut from "./PersistOut";
import UserState from "../user/UserState";
import LoadUserDataAction from "../../actions/LoadUserDataAction";
import AuthenticateUserAction from "../../actions/AuthenticateUserAction";

export default (store: Store) =>
    (next: (action: Action<any>) => void) =>
        async (action: Action<any>) => {
            next(action);
            if (action.type === AuthenticateUserAction.TYPE) {
                const authUser = (store.getState() as AppState).auth.user!;
                if (authUser) {
                    const userSession = authUser.getSignInUserSession();
                    if (userSession) {
                        // tslint:disable-next-line:max-line-length
                        const data = await axios.get(`${process.env.REACT_APP_PERSISTENCE_API_ENDPOINT}/users/data/${authUser.getUsername()}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${userSession.getIdToken().getJwtToken()}`,
                                },
                            }).then((response: AxiosResponse):UserState => {
                                return response.data;
                            });
                        next(new LoadUserDataAction(data));
                    } else {
                        console.warn("User session was not defined.");
                    }
                } else {
                    console.warn("User was not defined.");
                }
            }
        }