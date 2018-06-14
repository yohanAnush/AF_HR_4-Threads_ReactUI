import React, { Component } from 'react';

import LeaveInsert from './LeaveInsert';
import Breadcrumb from '../commons/Breadcrumb';

export default class LeaveView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
    }

    render() {
        return(
            <div>
                <Breadcrumb href={""} home={"HR"} current={"Leave"} />
                <div className={"card"}>
                    <LeaveInsert/>
                </div>
            </div>
        );
    }

}