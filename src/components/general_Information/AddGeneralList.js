import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Breadcrumb from '../commons/Breadcrumb';

export default class AddGeneralList extends Component {

    constructor(props) {
        super(props);
        this.state={
            service:'',
            errService:'',
            description: ''

        };

        this.onServiceChange = this.onServiceChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onServiceSubmit = this.onServiceSubmit.bind(this);
    }


    onServiceChange(e) {
        let service = e.target.value;
        this.setState({ service: service });

        if (/^[a-zA-Z\s]+$/.test(e.target.value)){
            this.setState({errService:'is-valid'});
        }else{
            this.setState({errService:'is-invalid'});
        }
    }

    onDescriptionChange(e) {
        let description = e.target.value;
        this.setState({ description: description });

        if (/^[a-zA-Z\s]+$/.test(e.target.value)){
            this.setState({errService:'is-valid'});
        }else{
            this.setState({errService:'is-invalid'});
        }
    }

    onServiceSubmit() {
        let data = {
            service: {
                service: this.state.service,
                description: this.state.description
            }
        };

        axios.put('http://localhost:3001/general/add/service', data)
            .then(response => {
                if (response.data.success) {
                    alert("Service added");
                }
            })
    }

    render(){
        return(
            <div>
                <Breadcrumb home={"HR"} current={"Add Service"}/>
                <div className={"card card-register mx-auto mt-5"}>
                    <div className="card-header">
                        Create New Service
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="deptName">Service Name</label>
                                <input name={"service"} onChange={this.onServiceChange} type="text" className={"form-control "+this.state.errService} id="deptName" placeholder="Enter department name"/>
                                <div className="invalid-feedback">Invalid service name</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deptDescription">Service Description</label>
                                <input name={"description"} onChange={this.onDescriptionChange} type="text" className={"form-control "+this.state.errService} id="deptDescription" placeholder="Enter department description"/>
                                <div className="invalid-feedback">Invalid service description</div>
                            </div>
                        </form>
                        <button type="button" className="btn btn-success btn-block" onClick={this.onServiceSubmit}>Add Service</button>
                    </div>
                </div>
            </div>
        )
    }

}
