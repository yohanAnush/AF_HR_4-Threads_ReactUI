import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import AttendanceListItem from './AttendanceListItem';

export default class AttendanceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attendances: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/attendance/')
            .then(response => {
                if (response.data.success) { this.setState({ attendances: response.data.data }); }
            })
            .catch(reject => {
                console.log(reject);
            }
        )
    }

    render() {
        return(
            <table className="table table-borderless">
                <thead>
                <tr>
                    <th scope="col">Employee</th>
                    <th scope="col">Date</th>
                    <th scope="col" >Time in <i className="fas fa-arrow-up"></i></th>
                    <th scope="col">Time out <i className="fas fa-arrow-down"></i></th>
                </tr>
                </thead>
                <tbody>
                    { this.state.attendances.map((attendance, i) => <AttendanceListItem attendance={attendance} key={i}/>) }
                </tbody>
            </table>
        )
    }
}