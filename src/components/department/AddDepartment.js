import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import DatePicker from '../commons/DatePicker';
import Breadcrumb from '../commons/Breadcrumb';

export default class AddDepartment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            did: '',
            name: '',
            description: '',
            manager: '',
            date_established:''
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onManagerNameChange = this.onManagerNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onDateChange(date) {
        this.setState({ date_established: date.toISOString() });
    }

    onNameChange(e) {
        let name = e.target.value;
        this.setState({ name: name });
    }

    onDescriptionChange(e) {
        let description = e.target.value;
        this.setState({ description: description });
    }

    onManagerNameChange(e) {
        let manager = e.target.value;
        this.setState({ manager: manager });
    }

    onSubmit() {
        axios.post('http://localhost:3001/department/add', {
            '﻿did' : this.state.did,
            'name' : this.state.name ,
            'description' : this.state.description ,
            'department_manager' : this.state.manager ,
            'date_established' : this.state.date_established
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        return(
            <div>
                <Breadcrumb home={"HR"} current={"Add Department"}/>
                <div className={"card"}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="deptId">Department Id</label>
                            <input type="text" className="form-control" id="deptId"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="deptName">Department Name</label>
                            <input onChange={this.onNameChange} type="text" className="form-control" id="deptName" placeholder="Enter department name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="deptDescription">Department Description</label>
                            <input onChange={this.onDescriptionChange} type="text" className="form-control" id="deptDescription" placeholder="Enter department description"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="deptManager">Department Manager</label>
                            <input onChange={this.onManagerNameChange} type="text" className="form-control" id="deptManager" placeholder="Enter department manager's name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateEstablished">Date Established</label>
                            <DatePicker onDateChange={this.onDateChange}/>
                            <small>{this.state.date}</small>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}