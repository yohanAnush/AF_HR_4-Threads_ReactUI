import React, { Component } from 'react';
import axios from 'axios';

import LeaveInsert from './LeaveInsert';
import Breadcrumb from '../commons/Breadcrumb';
import ResultView from '../commons/ResultView';

export default class LeaveInsertView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            results: [],
            id: ''

        };

        this.onTextChange = this.onTextChange.bind(this);
        this.getEmployeeWithEid = this.getEmployeeWithEid.bind(this);
        this.onResultSelection = this.onResultSelection.bind(this);
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
            axios.get('http://localhost:3001/employee/name/' + eid)
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

    onResultSelection(e) {
        e.persist();
        e.preventDefault();

        console.log(e.target.id);

        if (e.target.id !== undefined && e.target.id !== '') {
            // since the user selected a result,
            //      we no longer need to show all the results
            //      we can fill the search bar with the id/result of the selection.
            this.setState({ id: e.target.id, keyword: e.target.id });
            this.setState({ results: [] });

        }

    }

    render() {
        return(
            <div>
                <Breadcrumb href={"/"} home={"HR"} current={"Shift"}/>
                <div className={"card"}>
                    <LeaveInsert value={this.state.keyword} onTextChange={this.onTextChange}/>
                    <ResultView results={this.state.results} select={this.onResultSelection}/>
                </div>
            </div>
        );
    }

}