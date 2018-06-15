import React,{Component} from 'react';
import Employees from './Employees';
import axios from 'axios';


export default class BookHandler extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
        }
        this.getAllEmployees();
    }

    getAllEmployees(){
        axios.get('http://localhost:3001/employee').then(res =>{
            console.log(res.data.data);
            this.setState({
                employees: res.data.data || res.data
            });
        })
    }

    render() {
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Employee</li>
            </ol>

                    <div className="card">
                        <div className="card-header">Employee Details</div>
                        <div className="card-body">
                            <Employees employees={this.state.employees} getAllEmployees={() => this.getAllEmployees()}/>
                        </div>
                    </div>


        </div>;
    }
}