import React,{Component} from 'react';
import Employees from './EmployeeList';
import EmployeeSearch from './EmployeeSearch';
import axios from 'axios';
import Breadcrumb from '../commons/Breadcrumb';

export default class BookHandler extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            keyword:''
        }
        this.getAllEmployees();
        this.onTextChange = this.onTextChange.bind(this);
    }

    getAllEmployees(){
        axios.get('http://localhost:3001/employee').then(res =>{
            console.log(res.data.data);
            this.setState({
                employees: res.data.data || res.data
            });
        })
    }

    getEmployeeByName(keyword){
        axios.get('http://localhost:3001/employee/name/'+keyword).then(res =>{
            console.log(res.data.data);
            this.setState({
                employees: res.data.data || res.data
            });
        }).catch(()=>{
            this.getAllEmployees();
        })
    }

    onTextChange(e){
        this.getEmployeeByName(e.target.value);
    }

    render() {
        return <div>
            <Breadcrumb home={"Dashboard"} href={'/dashboard'} current={"Employee"}/>

            <div className="card">
                <div className="card-header">Employee Details</div>
                    <div className="card-body">
                        <EmployeeSearch onTextChange={this.onTextChange} />
                        <Employees employees={this.state.employees} getAllEmployees={() => this.getAllEmployees()}/>
                    </div>
            </div>
        </div>;
    }
}