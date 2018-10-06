import {Action} from "redux";

export default class LoginBegunAction implements Action<string> {
    public static ACTION_TYPE = "LOGIN_BEGUN";
    public type = LoginBegunAction.ACTION_TYPE;
    public email:string;
    public password:string;
    
    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
}