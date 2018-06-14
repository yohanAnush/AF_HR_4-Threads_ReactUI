import React, { Component } from 'react';

import AttendanceList from './AttendanceList';
import Breadcrumb from '../commons/Breadcrumb';

export default class AttendanceView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Breadcrumb href={""} home={"HR"} current={"Attendance"} />
                <div className={"card"}>
                    <AttendanceList/>
                </div>
            </div>
        );
    }
}