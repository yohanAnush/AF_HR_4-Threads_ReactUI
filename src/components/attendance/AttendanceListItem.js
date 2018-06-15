import React, { Component } from 'react';
import dateformat from 'dateformat';
import PropTypes from 'prop-types';

export default class AttendanceListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attendance: this.props.attendance
        };
    }

    render() {
        let attendance = this.state.attendance;
        return(
            <tr>
                <th scope="row">{ attendance.eid }</th>
                <td>{ attendance.date }</td>
                <td>{ attendance.time_start }</td>
                <td>{ attendance.time_end }</td>
            </tr>
        );
    }
}
