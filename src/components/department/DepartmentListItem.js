import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DepartmentListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            department: this.props.department
        };
    }

    render() {
        let department = this.state.department;
        return(
            <tr>
                <th scope="row">{ department.did }</th>
                <td>{ department.name }</td>
                <td>{ department.description }</td>
                <td>{ department.department_manager }</td>
                <td>{ department.date_established }</td>
            </tr>
        );
    }
}
