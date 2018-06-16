import React, { Component } from 'react';
import axios from 'axios';

import Breadcrumb from '../commons/Breadcrumb';

export default class LeaveUpdateView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eid: this.props.match.params.eid,
            date: this.props.match.params.date,
            leave: Object,
            start: '',
            end: ''
        }
    }

    componentDidMount() {
        let date = new Date(this.state.date);
        let y = date.getUTCFullYear();
        let m = (date.getUTCMonth()+1 <10) ? '0'+(date.getUTCMonth()+1) : date.getUTCMonth()+1;
        let d = date.getUTCDate()+1;


        date = y + '-' + m + '-' + d;
        console.log(date);
        axios.get('http://localhost:8080/leave?emp=' + this.state.eid + '&date=' + date)
            .then(response => {

                if (response.data.success) {
                    this.setState({ leave: response.data.data[0] });
                    this.setState({ start: response.data.data[0].start});
                    this.setState({ end: response.data.data[0].end});
                }
                console.log(this.state);
            })
    }

    render() {
        return(
            <div>
                <Breadcrumb home={"Leave"} href={'/leave'} current={"Update Leave"}/>

                <div className="card card-register mx-auto mt-5">
                    <div className="card-header">
                        Update leave of {this.state.eid}
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <label>Start</label>
                                        <input  type="text" className={"form-control "} placeholder="Date Start"  value={this.state.start} name={'start'} onChange={this.setChanges} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>End</label>
                                        <input type="email" className={"form-control "} placeholder="Date End"  value={this.state.end} name={'end'} onChange={this.setChanges} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}