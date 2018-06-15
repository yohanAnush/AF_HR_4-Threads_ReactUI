import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import dateformat from 'dateformat';

export default class DepartmentListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            department: this.props.department
        };
    }

    deleteDepartment(did){
        let confirmation = window.confirm("Are you sure you want to delete this department?");
        if(confirmation == true){
            axios.delete('http://localhost:3001/department/remove/' + did).then(res =>{
                if(res.status==200) {
                    this.props.getAllDepartments();
                }
            })
            return true;
        }
        return false;
    }

    render() {
        let department = this.state.department;
        return(
            <tr>
                <th scope="row">{ department.did }</th>
                <td>{ department.name }</td>
                <td>{ department.description }</td>
                <td>{ department.department_manager }</td>
                <td>{ dateformat(department.date_established, "yyyy/mm/dd")}</td>
                <td><button type="button" id={department.did} className="btn btn-danger" onClick={(e) => this.deleteDepartment(department.did)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </td>
                <td><button type="button" id={department.did} className="btn btn-success">
                        <Link style={{color: '#FFF'}} to={'edit-department/' + department.did}>Update</Link>
                    </button>
                </td>
            </tr>
        );
    }
}
