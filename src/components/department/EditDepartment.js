import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import DatePicker from '../commons/DatePicker';
import Breadcrumb from '../commons/Breadcrumb';

export default class EditDepartment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: ''
        };

        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({ date: date.toLocaleString() });
    }

    render(){
        return(
            <div>
                <Breadcrumb home={"HR"} current={"Edit Department"}/>
                <div className={"card"}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="deptId">Department Id</label>
                            <input type="text" className="form-control" id="deptId"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="EditDeptName">Department Name</label>
                            <input type="text" className="form-control" id="deptName" placeholder="Enter department name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="EditDateEstablished">Date Established</label>
                            <DatePicker onDateChange={this.onDateChange}/>
                            <small>{this.state.date}</small>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}