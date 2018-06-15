import React, { Component } from 'react';

import ShiftInsert from './ShiftInsert';
import Breadcrumb from '../commons/Breadcrumb';
import ResultView from '../commons/ResultView';
import axios from "axios/index";

export default class ShiftInsertView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eid: this.props.match.params.eid,
            shifts: [],
            results: [],
            keyword: ''
        };
    }

    onResultSelection(e) {
        this.setState({ eid: e });
    }

    onTextChange(e) {
        if (e.target.value !== '') {
            this.setState({ keyword: e.target.value });
            this.getEmployeeWithEid(this.state.keyword);

            console.log(this.state.results);
        }
    }

    getEmployeeWithEid(eid) {
        // to avoid sending a GET with an empty eid which will turn out to be a GET ALL employee request.
        if (!eid.includes(' ')) {
            axios.get('http://localhost:3001/shift/emp/' + eid)
                .then(response => {
                    if (response.data.success) {
                        this.setState({ results: response.data.data });
                    }
                    else {
                        this.setState({ results: [] });
                    }
                })
                .catch(reject => {
                    this.setState({ results: [] });
                });
        }
    }


    render() {
        return(
            <div>
                <Breadcrumb href={"/"} home={"HR"} current={"Leave"}/>

                <div className={"card"}>
                    <div className="card-body">
                        <ResultView results={this.state.results} select={this.onResultSelection}/>
                        <ShiftInsert value={this.state.keyword} onTextChange={this.onTextChange}/>
                    </div>
                </div>
            </div>
        );
    }
}