import React, { Component } from 'react';
import Calendar from 'react-calendar';

/*
 * This is a date picked enclosed in a dropdown button to make it easy to be used anywhere.
 *
 * @prop onDateChange(date)
 *      this should be a function provided by the parent to handle date change event.
 *
 * @state today
 *      this is basically the current date and time for the Calendar to highlight.
 */
export default class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            today: '',
            btnClasses: 'btn dropdown-toggle',
            btnColorClass: 'btn-secondary'
        };

        this.onDateChange = this.props.onDateChange.bind(this);
    }

    componentDidMount() {
        this.setState({ today: new Date() });

        // change dropdown button's color if provided.
        if (this.props.color != undefined && this.props.color !== '') { this.setState({ btnColorClass: this.props.color }); }
    }

    render() {
        return(
            <div className="dropdown show">
                <a className={this.state.btnClasses + ' ' + this.state.btnColorClass} href="#" role="button" id="dropdownMenuLink"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select Date
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="#">
                        <Calendar value={this.state.today} onChange={this.onDateChange}/>
                    </a>
                </div>
            </div>
        );
    }
}