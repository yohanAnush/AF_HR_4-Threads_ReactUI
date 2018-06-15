import React,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import CommonDetails from "../../Statics.Common";

export default class Employee extends Component{

    static get propTypes() {
        return {
            employee: PropTypes.object,
            getAllEmployees: PropTypes.func
        }
    }

    constructor(props){
        super(props);
        this.employee = props.employee;
        this.getAllEmployees = props.getAllEmployees;
    }

    delete(id) {
        var retVal = window.confirm("Are you sure you wish to delete this item?");
        if( retVal === true ){
            axios.delete(CommonDetails.NODE_API+'/employee/remove/' + id).then(results => {
                if(results.status === 200) {
                    this.getAllEmployees();
                }
            })
            return true;
        }
       return false;
    }

    update(id){

    }

    render() {
        return <tr>
            <td>{this.employee.eid}</td>
            <td>{this.employee.name}</td>
            <td>{this.employee.email}</td>
            <td>{this.employee.gender}</td>
            <td>{this.employee.position}</td>
            <td>{this.employee.department}</td>
            <td>{dateFormat(this.employee.date_joined, 'yyyy-mm-dd')}</td>
            <td>
                <button className={"btn btn-md btn-danger"} onClick={(e) => this.delete(this.employee.eid)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </td>
            <td>
                <button className={"btn btn-md btn-success"}>
                    <Link style={{color:"#FFF"}}  to={'update-employee/'+this.employee.eid}><i className="fa fa-edit"></i></Link>
                </button>
            </td>
        </tr>
    }
}