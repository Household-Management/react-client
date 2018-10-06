import * as React from "react";
import * as Modal from "react-modal";
import {connect} from "react-redux";
import {Card, CardContent, CardMedia} from "@material-ui/core";

import AppState from "../state/AppState";
import AppStatus from "../state/AppStatus";

import "./StatusModal.css";

export class StatusModal extends React.Component<AppStatus> {
    constructor(props:any){
        super(props);
    }
    
    public render() {
        console.log(this.props.statusModalOpen);
        return (<Modal
            isOpen={this.props.statusModalOpen}>
                <Card>
                    <CardMedia
                        className="mascot-image"
                        image="/images/green-alien-friendly.png"/>
                    <CardContent>
                        {this.props.message}
                    </CardContent>
                </Card>
            </Modal>);
    }
}


const connected = connect((state:AppState, ownProps:{}) => {
    return {...state.status, ...ownProps};
})(StatusModal);

export default connected;