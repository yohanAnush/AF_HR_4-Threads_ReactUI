import React, { Component } from 'react';
import dateformat from 'dateformat';
import axios from 'axios';

import DatePicker from '../commons/DatePicker';

export default class LeaveInsert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            today: '',
            eid: '',
            start: 'Start date',
            end: 'End date',
            value: this.props.value
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

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    onStartDateChange(date) {
        this.setState({ start: date.toUTCString() });
        console.log(this.state.start);
    }
    onEndDateChange(date) {
        this.setState({ end: date.toUTCString() });
        console.log(this.state.end);
    }

    checkEligibility() {
        axios.get('http://localhost:8080/leave/emp/' + this.state.value + '/issue?start=' + this.state.start + '&end=' + this.state.end)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        return(
            <form className={"form-inline"}>
                <div className={"form-group row"}>
                    <label htmlFor={"eidForLeave"}>Employee Id(eid)</label>
                    <input value={this.state.value} type={"text"} className={"form-control"} id={"eidTxt"} placeholder={"Enter EID"} onChange={this.onTextChange}/>
                    <DatePicker name={this.state.start} color={"btn-success"} onDateChange={this.onStartDateChange}/>
                    <DatePicker name={this.state.end} color={"btn-danger"} onDateChange={this.onEndDateChange}/>
                    <button className={"invisible"}>-</button>
                    <button type={"button"} className={"btn btn-md btn-primary"} onClick={this.checkEligibility}>Check</button>
                </div>
            </form>
        );
    }
}