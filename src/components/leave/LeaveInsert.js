import React, { Component } from 'react';
import axios from 'axios';

import DatePicker from '../commons/DatePicker';

export default class LeaveInsert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            today: '',
            eid: '',
            start: 'Start date',
            end: 'End date'
        };

        this.onTextChange = this.props.onTextChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.checkEligibility = this.checkEligibility.bind(this);
    }

    componentDidMount() {
        // set the date.
        this.setState({ today: new Date() });
    }

    onStartDateChange(date) {
        this.setState({ start: date.toLocaleString() });
        console.log(this.state.start);
    }
    onEndDateChange(date) {
        this.setState({ end: date.toLocaleString() });
        console.log(this.state.end);
    }

    checkEligibility() {
        axios.get('http://localhost:8080/leave/emp/' + this.state.eid + '/issue?start=' + + '&end=2018-06-07')
    }

    render() {
        return(
            <form className={"form-inline"}>
                <div className={"form-group row"}>
                    <label htmlFor={"eidForLeave"}>Employee Id(eid)</label>
                    <input type={"text"} className={"form-control"} id={"eidTxt"} placeholder={"Enter EID"} onChange={this.onTextChange}/>
                    <DatePicker name={this.state.start} color={"btn-success"} onDateChange={this.onStartDateChange}/>
                    <DatePicker name={this.state.end} color={"btn-danger"} onDateChange={this.onEndDateChange}/>
                    <button type={"button"} className={"btn btn-md btn-primary"} onClick={this.checkEligibility}>Check</button>
                </div>

            </form>
        );
    }
}