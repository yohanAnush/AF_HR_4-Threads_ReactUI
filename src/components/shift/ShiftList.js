import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ShiftListItem from './ShiftListItem';

export default class ShiftList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({ results: nextProp.results });
    }

    render() {
        return(
            <table className="table table-borderless">
                <thead>
                <tr>
                    <th scope="col">Employee</th>
                    <th scope="col">Monday</th>
                    <th scope="col">Tuesday</th>
                    <th scope="col">Wednesday</th>
                    <th scope="col">Thursday</th>
                    <th scope="col">Friday</th>
                    <th scope="col">Saturday</th>
                    <th scope="col">Sunday</th>
                </tr>
                </thead>
                <tbody>
                { this.state.results.map((result, i) => <ShiftListItem eid={result.eid} shift={result.shifts} key={i}/>) }
                </tbody>
            </table>
        )
    }
}