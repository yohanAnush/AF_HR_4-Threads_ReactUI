import React,{Component} from 'react';
import axios from 'axios';
import Breadcrumb from '../commons/Breadcrumb';
import ResultView from '../commons/ResultView';

export default class BookHandler extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            department:'',
            eid:'',
            departments:[],
            keyword:'',
            formErrors : {
                errEmployeeClass:'',
            }
        }
        this.getAllDepartments();
        this.assignEmployee = this.assignEmployee.bind(this);
        this.setChanges = this.setChanges.bind(this);
        this.onResultSelect = this.onResultSelect.bind(this);
    }

    getEmployeesByName(keyword){
        axios.get('http://localhost:3001/employee/name/'+keyword).then(res =>{
            console.log(res.data.data);
            this.setState({
                employees: res.data.data || res.data
            });
        }).catch(()=>{
            this.setState({
                employees: []
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
        this.checkValidations(e);
    }

    checkValidations(e){
        var formErrors = this.state.formErrors;
        if(e.target.name === 'keyword') {
            if (/^[a-zA-Z\s]+$/.test(e.target.value)) {
                formErrors.errEmployeeClass = 'is-valid';
                this.setState({formErrors: formErrors});
                this.getEmployeesByName(e.target.value);
            } else {
                formErrors.errEmployeeClass = 'is-invalid';
                this.setState({formErrors: formErrors});
                this.setState({employees: []});
            }
        }
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

    onResultSelect(e) {
        e.preventDefault();

        console.log(e.target.value);
        if (e.target.id !== undefined && e.target.id !== '') {
            this.setState({
                eid: e.target.id ,
                employees: [],
                keyword: e.target.value
            });
        }
    }

    render() {
        return <div>
            <Breadcrumb home={"Employee"} href={'/employee'} current={"Assign Employee"}/>

                <div className="card card-register mx-auto mt-5">
                    <div className="card-header">Employee Assign</div>
                    <div className="card-body">

                        <div className="form-group">
                            <label>Employee:</label>
                            <input type="text" className={"form-control "+this.state.formErrors.errEmployeeClass } placeholder="Employee Name" value={this.state.keyword}  name={'keyword'} onChange={this.setChanges} />
                            <div className="invalid-feedback">Invalid employee name</div>
                        </div>

                        <ResultView results={this.state.employees} select={this.onResultSelect}/>

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