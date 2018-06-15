import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Breadcrumb from '../commons/Breadcrumb';

export default class GeneralList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            doe: '',
            services: []
        }
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
            })
    }

    render() {
        return(
            <div>
                <Breadcrumb home={"HR"} current={"General information"}/>
                <br/>
                <div className={"card card-register mx-auto mt-5 "}>
                    <div className="card-header">
                        General Information
                    </div>
                    <div className="card-body">
                        <center>
                            <label><h3> {this.state.name} </h3></label>
                            <br/>
                            <label style={{color:'#104E8B'}}> SINCE   {this.state.doe}</label>
                            <br/>
                            <label style={{color:'#DAA520'}}> <h3>A Hospital trusted By Millions!</h3> </label>
                        </center>


                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Our health services .... </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.services.map(service => <tr><td>{service}</td></tr>)

                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}