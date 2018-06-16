import React,{Component} from 'react';
import axios from 'axios';
import Breadcrumb from '../commons/Breadcrumb';
import ResultView from '../commons/ResultView';
import CommonDetails from "../../Statics.Common";
import AssignedDepartmentList from "./AssignedDepartmentList";
import dataformat from 'dateformat';

export default class AssignEmployee extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            departmentName:'',
            deptid: '',
            eid: '',
            departmentsList:[],
            assignedDepartments:[],
            keyword:'',
            inTime:'',
            outTime:'',
            formErrors : {
                errEmployeeClass:'',
            }
        }

        this.getAllDepartments();
        this.assignEmployee = this.assignEmployee.bind(this);
        // this.setDepartmentChanges = this.setDepartmentChanges.bind(this);
        this.setChanges = this.setChanges.bind(this);
        this.onResultSelect = this.onResultSelect.bind(this);
        this.unAssignDepartment = this.unAssignDepartment.bind(this);
    }

    getEmployeesByID(eid){
        axios.get(CommonDetails.NODE_API+'/employee/id/'+eid).then(res =>{
            console.log(res.data.data);
            this.setState({
                assignedDepartments : res.data.data[0].departments
            });
        }).catch((err)=>{
            console.log(err);
        })
    }

    getEmployeesByName(keyword){
        axios.get(CommonDetails.NODE_API+'/employee/name/'+keyword).then(res =>{
            console.log(res.data.data);
            this.setState({
                employees: res.data.data || res.data,
            });
        }).catch(()=>{
            this.setState({
                employees: []
            });
        })
    }

    getAllDepartments(){
        axios.get(CommonDetails.NODE_API+'/department/').then((res) =>{
            console.log(res.data.data);
            this.setState({
                departmentsList : res.data.data
            })
        });
    }

    setChanges(e){
        this.setState({[e.target.name]:e.target.value});
        this.setState({[e.target.name]:e.target.value});


        if(e.target.name == 'departmentName') {
            this.state.departmentsList.map((item,i)=>{
                if(item.name == e.target.value){
                    this.setState({ deptid : item.did});
                }
            });
        }

        console.log(e.target.value +" | "+e.target.name);
        this.checkValidations(e);

    }

    // setDepartmentChanges(e){
    //     console.log(e.target.value);
    //     this.setState({departmentName:e.target.value});
    //     //
    //
    //     console.log(this.state.departmentName);
    //     console.log(this.state.deptid);
    //
    // }

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

    unAssignDepartment(d_id){
        this.state.assignedDepartments.map((element, i) =>{
            if(element.did === d_id){
                this.state.assignedDepartments.splice(i,1);
            }
        });

        axios.put(CommonDetails.NODE_API+'/employee/assign/'+this.state.eid, this.state.assignedDepartments).then((result) =>{
            console.log(result);
            if(result.data.success === true){
                alert("Assigned Department Details changed");
            }
            this.getEmployeesByID(this.state.eid);
        }).catch((err) =>{
            alert(err.data);
        });
    }

    assignEmployee(){

        console.log("departmentName >>> "+this.state.departmentName);
        console.log("did >>> "+this.state.deptid);

        var newAssigned = {
            did:this.state.deptid,
            name:this.state.departmentName,
            in_time:dataformat(this.state.inTime, 'yyyy-mm-dd HH:MM'),
            out_time:dataformat(this.state.outTime, 'yyyy-mm-dd HH:MM')
        };
        this.state.assignedDepartments.push(newAssigned);
        axios.put(CommonDetails.NODE_API+'/employee/assign/'+this.state.eid, this.state.assignedDepartments).then((result) =>{
            console.log(result);
            alert(result.data.data);
            this.getEmployeesByID(this.state.eid);
        }).catch((err) =>{
            alert(err.data);
        });
    }


    onResultSelect(e) {
        e.preventDefault();

        // console.log(e.target.value);
        if (e.target.id !== undefined && e.target.id !== '') {
            this.setState({
                eid: e.target.id ,
                employees: [],
                keyword: e.target.value
            });
            this.getEmployeesByID(e.target.id);
        }
    }

    render() {
        return <div>
            <Breadcrumb home={"Employee"} href={'/employee'} current={"Assign Employee"}/>

            <div className={"row"}>

                <div className={"col-md-6"}>
                    <div className="card">
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
                                <select className={'form-control'} name={'departmentName'} onChange={this.setChanges} >
                                {
                                    this.state.departmentsList.map((item, i) =>{
                                        return <option key={i} value={item.name}>{item.name}</option>
                                    })
                                }
                                </select>
                            </div>

                            <div className="form-group">
                                <label>In Time:</label>
                                <input type="datetime-local" className={"form-control " } placeholder="In Time" value={this.state.inTime}  name={'inTime'} onChange={this.setChanges} />
                                <div className="invalid-feedback">Invalid In Time</div>
                            </div>


                            <div className="form-group">
                                <label>Out Time:</label>
                                <input type="datetime-local" className={"form-control " } placeholder="Out Time" value={this.state.outTime}  name={'outTime'} onChange={this.setChanges} />
                                <div className="invalid-feedback">Invalid Out Time</div>
                            </div>

                            <button type={'button'} className="btn btn-success btn-block" onClick={this.assignEmployee}>Assign Employee</button>
                        </div>
                    </div>
                </div>

                <div className={"col-md-6"}>
                    <div className="card">
                        <div className="card-header">Assigned Department</div>
                        <div className="card-body">
                            <AssignedDepartmentList departments={this.state.assignedDepartments} unAssignDepartment={this.unAssignDepartment}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>;
    }
}