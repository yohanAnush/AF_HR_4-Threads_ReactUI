import React,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import CommonDetails from "../../Statics.Common";

export default class AssignedItem extends Component{

    static get propTypes() {
        return {
            department: PropTypes.object,
            getEmployeeDetails: PropTypes.func
        }
    }

    constructor(props){
        super(props);
        this.department = props.department;
        this.getEmployeeDetails = props.getEmployeeDetails;
    }

    delete(id) {
        var retVal = window.confirm("Are you sure you wish to un-assign this department?");
        if( retVal === true ){
            this.props.unAssignDepartment(id);
            return true;
        }
       return false;
    }

    render() {
        return <tr>
            <td>{this.department.did}</td>
            <td>{this.department.name}</td>
            <td>{this.department.in_time}</td>
            <td>{this.department.out_time}</td>
            <td>
                <button className={"btn btn-md btn-danger"} onClick={(e) => this.delete(this.department.did)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    }
}