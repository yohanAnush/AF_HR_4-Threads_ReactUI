import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import DatePicker from '../commons/DatePicker';
import Breadcrumb from '../commons/Breadcrumb';
import dateFormat from "dateformat";

export default class EditDepartment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            did: this.props.match.params.did,
            name: '',
            description: '',
            manager: '',
            date_established: '',
        };
        this.getDepartmentDetailsByID();

        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onManagerNameChange = this.onManagerNameChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onDateChange(e) {
        let date_established = e.target.value;
        console.log(date_established);
        //this.setState({ date_established: date.toISOString() });
        this.setState({ date_established: date_established });
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


    // Get details from database to the fields in edit department.
    getDepartmentDetailsByID(){
        axios.get('http://localhost:3001/department/'+this.props.match.params.did).then((res) =>{
            console.log(res.data);
            this.setState({
                '﻿did' : res.data.data[0].did,
                'name' : res.data.data[0].name ,
                'description' : res.data.data[0].description ,
                'manager' : res.data.data[0].department_manager ,
                'date_established' : res.data.data[0].date_established
            })
        });
    }


    onUpdate() {
        axios.put('http://localhost:3001/department/update/' + this.props.match.params.did, {
            '﻿did' : this.state.did,
            'name' : this.state.name ,
            'description' : this.state.description ,
            'department_manager' : this.state.manager ,
            'date_established' : this.state.date_established
        })
            .then(function (response) {
                console.log(response);
                this.props.getAllDepartments();
                this.DepartmentList
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render(){
        return(
            <div>
                <Breadcrumb home={"HR"} current={"Edit Department"}/>
                <div className={"card"}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="deptId">Department Id</label>
                            <input value={this.state.did} type="text" className="form-control" id="deptId"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newDeptName">Department Name</label>
                            <input onChange={this.onNameChange} type="text" className="form-control" id="deptName" value={this.state.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newDeptDescription">Department Description</label>
                            <input onChange={this.onDescriptionChange} type="text" className="form-control" id="deptDescription" value={this.state.description}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newDeptManager">Department Manager</label>
                            <input onChange={this.onManagerNameChange} type="text" className="form-control" id="deptManager" value={this.state.manager}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateEstablished">Date Established</label>
                            <input type="date" className="form-control" name={'dateEstablished'} onChange={this.onDateChange} value={dateFormat(this.state.date_established, 'yyyy-mm-dd')}/>
                            <small>{this.state.date}</small>
                        </div>

                        <button type="button" className="btn btn-primary" onClick={this.onUpdate}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}