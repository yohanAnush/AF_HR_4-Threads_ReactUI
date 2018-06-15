import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Breadcrumb from '../commons/Breadcrumb';
import DepartmentListItem from './DepartmentListItem';

export default class DepartmentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/department/')
            .then(response => {
                if (response.data.success) { this.setState({ departments: response.data.data }); }
            })
            .catch(rejected => {
                    console.log(rejected);
                }
            )
    }

    render() {
        return(
            <div>
                <Breadcrumb home={"HR"} current={"View Departments"}/>
                <div className={"card"}>
                    <table className="table table-borderless">
                        <thead>
                        <tr>
                            <th scope="col">Department Id</th>
                            <th scope="col">Department Name</th>
                            <th scope="col">Department Description</th>
                            <th scope="col">Department Manager</th>
                            <th scope="col">Date Established</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.state.departments.map((department, i) => <DepartmentListItem department={department} key={i}/>) }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}