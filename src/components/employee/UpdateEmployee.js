import React,{Component} from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import Breadcrumb from '../commons/Breadcrumb';
import CommonDetails from "../../Statics.Common";

export default class UpdateEmployee extends  Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            email : '',
            gender : 'Male',
            position : '',
            date_joined : '',
            formErrors : {
                errNameClass:'',
                errEmailClass:'',
                errPositionClass:'',
            }
        }

        this.setChanges = this.setChanges.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.getEmployeeDetailsById();
    }

    setChanges(e){
        this.setState({[e.target.name]:e.target.value});

        this.checkValidations(e);
    }

    checkValidations(e){
        var formErrors = this.state.formErrors;
        if(e.target.name === 'name'){
            if (/^[a-zA-Z\s]+$/.test(e.target.value)) {
                formErrors.errNameClass = 'is-valid';
                this.setState({formErrors: formErrors});
            }else{
                formErrors.errNameClass = 'is-invalid';
                this.setState({formErrors: formErrors});
            }
        }

        if(e.target.name === 'email'){
            if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)) {
                formErrors.errEmailClass = 'is-valid';
                this.setState({formErrors: formErrors});
            }else{
                formErrors.errEmailClass = 'is-invalid';
                this.setState({formErrors: formErrors});
            }
        }

        if(e.target.name === 'position'){
            if (/^[a-zA-Z\s]+$/.test(e.target.value)) {
                formErrors.errPositionClass = 'is-valid';
                this.setState({formErrors: formErrors});
            }else{
                formErrors.errPositionClass = 'is-invalid';
                this.setState({formErrors: formErrors});
            }
        }
    }

    updateEmployee(){
        axios.put(CommonDetails.NODE_API+'/employee/update/'+ this.props.match.params.eid,{
            name:this.state.name,
            email:this.state.email,
            gender:this.state.gender,
            position:this.state.position,
            date_joined: this.state.date_joined
        }).then((res) =>{
            if(res.data.success === false){
                alert("Validation Error..!\n"+res.data.data);
            }
            if(res.data.success === true){
                alert("Success..!\n"+res.data.data);
            }
        }).catch((err)=>{
            console.log(err);
            alert(err);
        });
    }

    getEmployeeDetailsById(){
        axios.get('http://localhost:3001/employee/id/'+this.props.match.params.eid).then((res) =>{
            console.log(res.data.data);
            this.setState({
                name : res.data.data[0].name,
                email : res.data.data[0].email,
                gender : res.data.data[0].gender,
                position : res.data.data[0].position,
                date_joined : res.data.data[0].date_joined,
            })
        });
    }


    render(){
        return(<div>
                <Breadcrumb home={"Employee"} href={'/employee'} current={"Update Employee"}/>


                <div className="card card-register mx-auto mt-5">
                    <div className="card-header">
                        Update Employee
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <label>First name</label>
                                        <input type="text" className={"form-control "+this.state.formErrors.errNameClass } placeholder="Enter Name"  value={this.state.name} name={'name'} onChange={this.setChanges} />
                                        <div className="invalid-feedback">Invalid name</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email:</label>
                                        <input type="email" className={"form-control "+this.state.formErrors.errEmailClass } placeholder="Email Address"  value={this.state.email} name={'email'} onChange={this.setChanges} />
                                        <div className="invalid-feedback">Invalid email address</div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Position:</label>
                                <input type="text" className={"form-control "+this.state.formErrors.errPositionClass } placeholder="Position" value={this.state.position} name={'position'} onChange={this.setChanges} />
                                <div className="invalid-feedback">Invalid position name</div>
                            </div>

                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Gender:</label>
                                            <select className={'form-control'} name={'gender'} onChange={this.setChanges} >
                                                <option selected={this.state.gender === 'Male'} value={'Male'}>Male</option>
                                                <option selected={this.state.gender === 'Female'} value={'Female'}>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Joined Date:</label>
                                            <input type="date" className="form-control" value={dateFormat(this.state.date_joined, 'yyyy-mm-dd')} name={'date_joined'} onChange={this.setChanges} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type={'button'} className="btn btn-success btn-block" onClick={this.updateEmployee}>Update Employee</button>
                        </form>
                    </div>
                </div>
                <br/>
            </div>

        );
    }
}