import React,{Component} from 'react';
import axios from 'axios';

export default class addEmployee extends  Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            email : '',
            gender : 'Male',
            position : '',
            department : '',
            date_joined : '',
            departments:[],
            hasErrors: true,
            formErrors : {
                errNameClass:'',
                errEmailClass:'',
                errPositionClass:'',
            }
        }

        console.log(this.state.formErrors);
        this.setChanges = this.setChanges.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.getAllDepartments();
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

    addEmployee(){
        axios.post('http://localhost:3001/employee/add',{
            name:this.state.name,
            email:this.state.email,
            gender:this.state.gender,
            position:this.state.position,
            department:this.state.department,
            date_joined:this.state.date_joined
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

    getAllDepartments(){
        axios.get('http://localhost:3001/department/').then((res) =>{
            console.log(res.data.data);
            this.setState({
                departments : res.data.data
            })
        });
    }

    render(){
        return(
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="/employee">Employee</a>
                    </li>
                    <li className="breadcrumb-item active">Add Employee</li>
                </ol>

                <div className="card card-register mx-auto mt-5">
                    <div className="card-header">
                        Register New Employee
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <label>First name</label>
                                        <input type="text" className={"form-control "+this.state.formErrors.errNameClass } placeholder="Enter first name" name={'name'} onChange={this.setChanges} />
                                        <div className="invalid-feedback">Invalid first name</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Last name</label>
                                        <input className="form-control" type="text" placeholder="Enter last name" />
                                        <div className="invalid-feedback">Invalid last name</div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className={"form-control "+this.state.formErrors.errEmailClass } placeholder="Email Address" name={'email'} onChange={this.setChanges} />
                                <div className="invalid-feedback">Invalid email address</div>
                            </div>


                            <div className="form-group">
                                <label>Position:</label>
                                <input type="text" className={"form-control "+this.state.formErrors.errPositionClass } placeholder="Position" name={'position'} onChange={this.setChanges} />
                                <div className="invalid-feedback">Invalid position name</div>
                            </div>

                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Gender:</label>
                                            <select className={'form-control'} name={'gender'} onChange={this.setChanges} >
                                                <option value={'Male'}>Male</option>
                                                <option value={'Female'}>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Department:</label>
                                            <select className={'form-control'} name={'department'} onChange={this.setChanges} >
                                                {
                                                    this.state.departments.map((item, i) =>{
                                                        return <option key={i} value={item.name}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Joined Date:</label>
                                <input type="date" className="form-control" name={'date_joined'} onChange={this.setChanges} />
                            </div>

                            <button type={'button'} className="btn btn-success btn-block" onClick={this.addEmployee}>Register Employee</button>

                        </form>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}