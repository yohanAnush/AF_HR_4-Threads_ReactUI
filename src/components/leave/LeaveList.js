import React, { Component } from 'react';
import axios from 'axios';

import LeaveListItem from './LeaveListItem';
import DatePicker from '../commons/DatePicker';

export default class AttendanceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaves: [],
            name: 'Get by date'
        };

        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8080/leave/')
            .then(response => {
                if (response.data.success) { this.setState({ leaves: response.data.data }); }
            })
            .catch(reject => {
                    console.log(reject);
                }
            )
    }

    onDateChange(date) {
        let y = date.getUTCFullYear();
        let m = date.getUTCMonth() + 1; // because it ranges from 0 to 11 in JS.
        let d = date.getUTCDate() + 1;

        // month becomes a single digit till October but standard is having it as two digits.
        if (m < 10) { m = '0' + m; }

        let constructedDate = y + '-' + m + '-' + d;

        this.setState({ name: date.toLocaleString() });
        axios.get('http://localhost:8080/leave/date/' + constructedDate)
            .then(response => {
                if (response.data.success) { this.setState({ leaves: response.data.data }); }
            })
    }

    render() {
        return(
            <div>
                <DatePicker name={this.state.name} onDateChange={this.onDateChange} />
                <table className="table table-borderless">
                    <thead>
                    <tr>
                        <th scope="col">Employee</th>
                        <th scope="col">Date start</th>
                        <th scope="col">Date end</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.leaves.map((leave, i) => <LeaveListItem leave={leave} key={i}/>) }
                    </tbody>
                </table>
            </div>
        )
    }
}