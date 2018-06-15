import React, { Component } from 'react';

export default class LeaveListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leave: this.props.leave
        };
    }

    render() {
        let leave = this.state.leave;
        return(
            <tr>
                <th scope="row">{ leave.eid }</th>
                <td>{ leave.start }</td>
                <td>{ leave.end }</td>
            </tr>
        );
    }
}
