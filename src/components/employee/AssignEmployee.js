import React,{Component} from 'react';
import axios from 'axios';

export default class BookHandler extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            department:'',
            eid:'',
            departments:[]
        }
        this.getAllEmployee();
        this.getAllDepartments();
        this.assignEmployee = this.assignEmployee.bind(this);
        this.setChanges = this.setChanges.bind(this);
    }

    getAllEmployee(){
        axios.get('http://localhost:3001/employee').then(res =>{
            console.log(res.data.data);
            this.setState({
                employees: res.data.data || res.data
            });
        })
    }

    getAllDepartments(){
        axios.get('http://localhost:3001/department/').then((res) =>{
            console.log(res.data.data);
            this.setState({
                departments : res.data.data
            })
        });
    }

    setChanges(e){
        this.setState({[e.target.name]:e.target.value});
    }

    assignEmployee(){
        axios.put('http://localhost:3001/employee/assign',{
            eid:this.state.eid,
            department:this.state.department
        }).then((result) =>{
            console.log(result);
            alert(result.data.data);
        }).catch((err) =>{
            alert(err.data);
        });
    }

    render() {
        return <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="/employee">Employee</a>
                    </li>
                    <li className="breadcrumb-item active">Assign Employee</li>
                </ol>
                <div className="card card-register mx-auto mt-5">
                    <div className="card-header">Employee Assign</div>
                    <div className="card-body">

                        <div className="form-group">
                            <label>Employee:</label>
                            <select className={'form-control'} name={'eid'} onChange={this.setChanges} >
                                {
                                    this.state.employees.map((item,i)=>{
                                        return <option key={i} value={item.eid}>{item.eid + " | " + item.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Department:</label>
                            <select className={'form-control'} name={'department'} onChange={this.setChanges} >
                                {
                                    this.state.departments.map((item, i) =>{
                                        return <option key={i} selected={this.state.departments === item.name} value={item.name}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <button type={'button'} className="btn btn-success" onClick={this.assignEmployee}>Assign Employee</button>

                    </div>
                </div>
        </div>;
    }
}