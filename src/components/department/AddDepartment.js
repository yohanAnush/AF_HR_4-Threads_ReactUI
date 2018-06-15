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
            date_established:'Date established',
            errDeptName:'',
            errDeptDescription:'',
            errDeptManager:'',
            errDeptDate:''

        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onManagerNameChange = this.onManagerNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onDateChange(e) {
        let date_established = e.target.value;
        //this.setState({ date_established: date.toISOString() });
        this.setState({ date_established: date_established });
    }

    onNameChange(e) {
        let name = e.target.value;
        this.setState({ name: name });

        if (/^[a-zA-Z\s]+$/.test(e.target.value)){
            this.setState({errDeptName:'is-valid'});
        }else{
            this.setState({errDeptName:'is-invalid'});
        }
    }

    onDescriptionChange(e) {
        let description = e.target.value;
        this.setState({ description: description });

        if (/^[a-zA-Z\s]*[0-9]*[,|.]*$/.test(e.target.value)){
            this.setState({errDeptDescription:'is-valid'});
        }else{
            this.setState({errDeptDescription:'is-invalid'});
        }
    }

    onManagerNameChange(e) {
        let manager = e.target.value;
        this.setState({ manager: manager });

        if (/^[a-zA-Z\s]+$/.test(e.target.value)){
            this.setState({errDeptManager:'is-valid'});
        }else{
            this.setState({errDeptManager:'is-invalid'});
        }
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
                <div className={"card card-register mx-auto mt-5"}>
                    <div className="card-header">
                        Create New Department
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="deptName">Department Name</label>
                                <input onChange={this.onNameChange} type="text" className={"form-control "+this.state.errDeptName} id="deptName" placeholder="Enter department name"/>
                                <div className="invalid-feedback">Invalid department name</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deptDescription">Department Description</label>
                                <input onChange={this.onDescriptionChange} type="text" className={"form-control "+this.state.errDeptDescription} id="deptDescription" placeholder="Enter department description"/>
                                <div className="invalid-feedback">Invalid department description</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deptManager">Department Manager</label>
                                <input onChange={this.onManagerNameChange} type="text" className={"form-control "+this.state.errDeptManager} id="deptManager" placeholder="Enter department manager's name"/>
                                <div className="invalid-feedback">Please enter only letters</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateEstablished">Date Established</label>
                                <input type="date" className="form-control" name={'dateEstablished'} onChange={this.onDateChange} />
                                <small>{this.state.date}</small>
                            </div>

                            <button type="button" className="btn btn-success btn-block" onClick={this.onSubmit}>Add Department</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}