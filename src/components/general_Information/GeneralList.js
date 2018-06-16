import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Breadcrumb from '../commons/Breadcrumb';
import CardsView from './CardsView';

export default class GeneralList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            doe: '',
            services: []
        }

        this.deleteService = this.deleteService.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/general')
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        services: response.data.data[0].services,
                        name: response.data.data[0].hospital_name,
                        doe: response.data.data[0].date_established
                    });
                }
            }).catch((err)=> {
            console.log(err);
        })
    }

    deleteService(service){
        let confirmation = window.confirm("Are you sure you want to delete this service?");
        if(confirmation == true){
            axios.delete('http://localhost:3001/general/remove/' + service).then(res =>{
                if(res.data.success) {
                    axios.get('http://localhost:3001/general')
                        .then(response => {
                            if (response.data.success) {
                                this.setState({
                                    service: response.data.data[0].service,
                                    name: response.data.data[0].hospital_name,
                                    doe: response.data.data[0].date_established
                                });
                            }
                        })
                }
            })
            return true;
        }
        return false;
    }

    onTextChange(e) {
        let keyword = e.target.value;

        axios.get('http://localhost:3001/general')
            .then(response => {
                if (response.data.success) {
                    let s = response.data.data[0].services;
                    for (let i = 0; i < s.length; i++) {
                        if (!s[i].service.includes(keyword)) {
                            s.splice(i, 1);
                        }
                    }
                    this.setState({
                        services: s
                    });
                }
            }).catch((err)=> {
            console.log(err);
        })
    }

    render() {
        return(
            <div>
                <Breadcrumb home={"HR"} current={"General information"}/>
                <br/>
                <CardsView/>
                <div className={"card card-register mx-auto mt-5 "}>
                    <div className="card-header">
                        General Information
                    </div>
                    <br/>
                    <nav className="navbar navbar-light" style={{bg:'#FFFF'}}>
                        <a className="navbar-brand"></a>
                        <form className="form-inline">
                            <input onChange={this.onTextChange} className="form-control mr-sm-2" type="search" placeholder="Search service ... " aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                    </nav>
                    <br/>
                    <div className="card-body">
                        <center>
                            <label><h3> {this.state.name} </h3></label>
                            <br/>
                            <label style={{color:'#104E8B'}}> SINCE   {this.state.doe}</label>
                            <br/>
                            <label style={{color:'#DAA520'}}> <h3>A Hospital Trusted By Millions!</h3> </label>
                        </center>


                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Our health services .... </th>
                                <th scope="col">Delete Service </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.services.map(service =>
                                    <tr>
                                        <td key={service}>{service.service} <br/> <small>{service.description}</small></td>
                                        <td><button type="button" id={service} className="btn btn-danger" onClick={(e) => this.deleteService(service)} key={service}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                        </td>
                                    </tr>)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}