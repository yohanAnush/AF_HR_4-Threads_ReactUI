import React, { Component } from 'react';

export default class Breadcrumb extends Component {

    constructor(props) {
        super(props);
        this.state = {
            href: this.props.href,
            home: this.props.home,
            current: this.props.current
        };
    }

    render() {
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href={this.state.href}>{ this.state.home }</a>
                </li>
                <li className="breadcrumb-item active">{ this.state.current }</li>
            </ol>
        );
    }
}