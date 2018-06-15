import React, { Component } from 'react';
import axios from "axios/index";

import ShiftList from './ShiftList';

export default class ShiftListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/shift/')
            .then(response => {
                if (response.data.success) {
                    this.setState({ results: response.data.data });
                }
            })
            .catch(reject => {
                    console.log(reject);
                }
            )
    }

    render() {
        return(<ShiftList results={this.state.results}/>)
    }
}