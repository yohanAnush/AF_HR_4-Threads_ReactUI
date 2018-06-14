import React, { Component } from 'react';
import ResultEntry from './ResultEntry';

/*
 * This basically shows the array provided to it in a list form.
 * Can be used to represent search results quickly where only one parameter is shown along with an id to uniquely identify that parameter.
 *
 * DO NOT fetch data here, since this component must be called by a parent who already has data. This is simply to view it.
 *
 * @props results
 *      an array of object to be shown. from each object we may only take its id and some other descriptive parameter for the user to see.
 *
 * @props select(id)
 *      a function provided by the parent to stay aware about the id of the element that the user selected from the results.
 */

export default class ResultView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results
        };

        this.select = this.props.select.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ results: nextProps.results });
    }

    render() {
        return(
            <div className="list-group">
                { this.state.results.map((result, i) => <ResultEntry key={i} id={result.eid} result={result.name} onClick={this.select}/>) }
            </div>
        );
    }
}