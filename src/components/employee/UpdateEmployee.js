import React,{Component} from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';

export default class UpdateEmployee extends  Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            email : '',
            gender : 'Male',
            position : '',
            department : 'OPD',
            date_joined : '',
            formErrors: {email: '', password: ''},
            errname:'',
            departments:[]
        }

        this.setChanges = this.setChanges.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.getAllDepartments();
        this.getEmployeeDetails();
    }

    setChanges(e){
        this.setState({[e.target.name]:e.target.value});
        if(this.state.name.length < 5){
            this.setState({errname:"hfghgh"});
        }else{
            this.setState({errname:""});
        }
    }

    updateEmployee(){
        axios.put('http://localhost:3001/employee/update/'+ this.props.match.params.eid,{
            name:this.state.name,
            email:this.state.email,
            gender:this.state.gender,
            position:this.state.position,
            department:this.state.department,
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

    getEmployeeDetails(){
        axios.get('http://localhost:3001/employee/id/'+this.props.match.params.eid).then((res) =>{
            console.log(res.data.data);
            this.setState({
                name : res.data.data[0].name,
                email : res.data.data[0].email,
                gender : res.data.data[0].gender,
                position : res.data.data[0].position,
                department : res.data.data[0].department,
                date_joined : res.data.data[0].date_joined,
            })
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
        return(<div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="/employee">Employee</a>
                    </li>
                    <li className="breadcrumb-item active">Update Employee</li>
                </ol>

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
                                        <input type="text" className="form-control" placeholder="Enter first name"  value={this.state.name} name={'name'} onChange={this.setChanges} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Last name</label>
                                        <input type="text" className="form-control" placeholder="Enter last name"  value={this.state.name} name={'name'} onChange={this.setChanges} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="form-control" placeholder="Email Address"  value={this.state.email} name={'email'} onChange={this.setChanges} />
                            </div>

                            <div className="form-group">
                                <label>Position:</label>
                                <input type="text" className="form-control" placeholder="Position" value={this.state.position} name={'position'} onChange={this.setChanges} />
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
                                            <label>Department:</label>
                                            <select className={'form-control'} name={'department'} onChange={this.setChanges} >
                                                {
                                                    this.state.departments.map((item, i) =>{
                                                        return <option key={i} selected={this.state.department === item.name} value={item.name}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Joined Date:</label>
                                <input type="date" className="form-control" value={dateFormat(this.state.date_joined, 'yyyy-mm-dd')} name={'date_joined'} onChange={this.setChanges} />
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