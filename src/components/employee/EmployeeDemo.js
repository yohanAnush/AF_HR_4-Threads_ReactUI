import React, { Component } from 'react';

import Breadcrumb from '../commons/Breadcrumb';

export default class EmployeeDemo extends Component {

    render() {
        return(
            <div>
                <Breadcrumb href={""} home={"HR"} current={"Employee"} />
                <p>This is Employee Demo</p>
            </div>
        )
    }
}