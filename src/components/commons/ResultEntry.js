import React,{ Component } from 'react';

/*
 * This represent a single element in a list of search results.
 *
 * @props id
 *      The id which is used to uniquely identify the result, can be some primary key or something.
 *
 * @props result
 *      Actual data that the user wants to see and select.
 *
 * @props select(id)
 *      Provided by the parent to determine which element was actually selected by the user.
 */
export default class ResultEntry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            result: this.props.result
        };

        this.select = this.props.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ result: nextProps.result });
    }

    render() {
        return(
            <button id={this.props.id} onClick={this.select} type="button" className="list-group-item list-group-item-action"><small>{ this.props.result }</small></button>
        );
    }

}