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
            date_established:''
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onDateChange(date) {
        this.setState({ date_established: date.toLocaleString() });
    }

    onNameChange(e) {
        let name = e.target.value;
        this.setState({ name: name });
    }

    onSubmit() {
        console.log(this.state.date_established + ' ' + this.state.name);
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