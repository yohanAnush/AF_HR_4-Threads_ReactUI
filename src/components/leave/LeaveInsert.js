import React, { Component } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

export default class LeaveInsert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            today: '',
            eid: '',
            start: '',
            end: ''
        };
    }

    componentDidMount() {
        // set the date.
        this.setState({ today: new Date() });
    }

    render() {
        return(
            <form className={"form-group"}>
                <div className={"form-group"}>
                    <label htmlFor={"eidForLeave"}>Employee Id(eid)</label>
                    <input type={"text"} className={"form-control"} id={"eidTxt"} placeholder={"Enter EID"}/>
                </div>
            </form>
        );
    }
}