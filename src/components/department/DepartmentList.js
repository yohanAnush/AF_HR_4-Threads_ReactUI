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

        this.getAllDepartments = this.getAllDepartments.bind(this);
    }

    // Fetching data when component is rendered and is a get request.
    componentDidMount() {
        this.getAllDepartments();
    }

    getAllDepartments() {
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
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.state.departments.map((department, i) =>
                            <DepartmentListItem getAllDepartments={() => this.getAllDepartments()} department={department} key={department.did}/>) }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}