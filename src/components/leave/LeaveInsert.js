import React, { Component } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

import DatePicker from '../commons/DatePicker';

export default class LeaveInsert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            today: '',
            eid: '',
            start: '',
            end: ''
        };

        this.onTextChange = this.props.onTextChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
    }

    componentDidMount() {
        // set the date.
        this.setState({ today: new Date() });
    }

    onStartDateChange(date) {
        this.setState({ start: date });
        console.log(this.state.start);
    }
    onEndDateChange(date) {
        this.setState({ end: date });
        console.log(this.state.end);
    }

    render() {
        return(
            <form className={"form-inline"}>
                <div className={"form-group row"}>
                    <label htmlFor={"eidForLeave"}>Employee Id(eid)</label>
                    <input type={"text"} className={"form-control"} id={"eidTxt"} placeholder={"Enter EID"} onChange={this.onTextChange}/>
                    <DatePicker color={"btn-success"} onDateChange={this.onStartDateChange}/>
                    <DatePicker color={"btn-danger"} onDateChange={this.onEndDateChange}/>
                </div>

            </form>
        );
    }
}