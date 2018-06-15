import React,{Component} from 'react';
import Employees from './EmployeeList';
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

    getEmployeeByName(){

    }

    render() {
        return <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Employee</li>
            </ol>


            <div className="col-md-8 col-md-offset-2">
                <div className="row">
                    <h2>Search Employee</h2>
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                            <input type="text" className="search-query form-control" placeholder="Search"  id="keyword"/>
                            <span className="input-group-btn">
							<button id="search-food" class="btn btn-success" type="button">
								<span className="fa fa-search"></span>
							</button>
						</span>
                        </div>
                    </div>
                </div>
            </div>

                    <div className="card">
                        <div className="card-header">Employee Details</div>
                        <div className="card-body">
                            <Employees employees={this.state.employees} getAllEmployees={() => this.getAllEmployees()}/>
                        </div>
                    </div>


        </div>;
    }
}