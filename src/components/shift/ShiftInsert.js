    import React, { Component } from 'react';
import dateformat from 'dateformat';
import axios from 'axios';

import DatePicker from '../commons/DatePicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

export default class ShiftInsert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eid: '',
            shifts: [],

            monday: {day: 'monday', time_start: '', time_end: ''},
            tuesday: {day: 'tuesday', time_start: '', time_end: ''},
            wednesday: {day: 'wednesday', time_start: '', time_end: ''},
            thursday: {day: 'thursday', time_start: '', time_end: ''},
            friday: {day: 'friday', time_start: '', time_end: ''},
            saturday: {day: 'saturday', time_start: '', time_end: ''},
            sunday: {day: 'sunday', time_start: '', time_end: ''},
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],

            value: this.props.value
        };

        this.onTimeChange = this.onTimeChange.bind(this);
        this.submit = this.submit.bind(this);
        this.onTextChange = this.props.onTextChange.bind(this);
    }

    componentDidMount() {
        // set the date.
        this.setState({ today: new Date() });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    onTimeChange(e) {
        // get the day first.
        let content = e.target.id.split(':');
        let day = content[0];
        let type = content[1];
        let time = e.target.value;

        // TODO find a better way, this is so ugly :(
        switch (day) {
            case 'monday':
                if (type === 'time_start') { this.setState({ monday: { day:this.state.monday.day, time_start: time, time_end: this.state.monday.time_end } }); }
                if (type === 'time_end') { this.setState({ monday: { day:this.state.monday.day, time_start: this.state.monday.time_start, time_end: time } }); }
                break;
            case 'tuesday':
                if (type === 'time_start') { this.setState({ tuesday: { day:this.state.tuesday.day, time_start: time, time_end: this.state.tuesday.time_end } }); }
                if (type === 'time_end') { this.setState({ tuesday: { day:this.state.tuesday.day, time_start: this.state.tuesday.time_start, time_end: time } }); }
                break;
            case 'wednesday':
                if (type === 'time_start') { this.setState({ wednesday: { day:this.state.wednesday.day, time_start: time, time_end: this.state.wednesday.time_end } }); }
                if (type === 'time_end') { this.setState({ wednesday: { day:this.state.wednesday.day, time_start: this.state.wednesday.time_start, time_end: time } }); }
                break;
            case 'thursday':
                if (type === 'time_start') { this.setState({ thursday: { day:this.state.thursday.day, time_start: time, time_end: this.state.thursday.time_end } }); }
                if (type === 'time_end') { this.setState({ thursday: { day:this.state.thursday.day, time_start: this.state.thursday.time_start, time_end: time } }); }
                break;
            case 'friday':
                if (type === 'time_start') { this.setState({ friday: { day:this.state.friday.day, time_start: time, time_end: this.state.friday.time_end } }); }
                if (type === 'time_end') { this.setState({ friday: { day:this.state.friday.day, time_start: this.state.friday.time_start ,time_end: time } }); }
                break;
            case 'saturday':
                if (type === 'time_start') { this.setState({ saturday: { day:this.state.saturday.day, time_start: time, time_end: this.state.saturday.time_end } }); }
                if (type === 'time_end') { this.setState({ saturday: { day:this.state.saturday.day, time_start: this.state.saturday.time_start, time_end: time } }); }
                break;
            case 'sunday':
                if (type === 'time_start') { this.setState({ sunday: { day:this.state.sunday.day, time_start: time, time_end: this.state.sunday.time_end } }); }
                if (type === 'time_end') { this.setState({ sunday: { day:this.state.sunday.day, time_start: this.state.sunday.time_start, time_end: time } }); }
                break;
        }



        console.log(this.state);

    }

    submit() {

        let data = {
            eid: this.state.value,
            shifts: [
                this.state.monday,
                this.state.tuesday,
                this.state.wednesday,
                this.state.thursday,
                this.state.friday,
                this.state.saturday,
                this.state.sunday
            ]
        };

        axios.post('http://localhost:3001/shift/add', data)
            .then(response => {
                console.log(response);
            })
    }

    render() {
        return(
            <div>
                <form>
                            <form className={"form-inline"}>
                                <div className={"form-group"}>
                                    <div className="col-md-6">
                                    <label htmlFor={"eidForLeave"}>Employee Id(eid)</label>
                                    </div>
                                    <div className="col-md-4">
                                    <input value={this.props.value} type={"text"} className={"form-control"} id={"eidTxt"} placeholder={"Enter EID"} onChange={this.onTextChange}/>
                                    </div>
                                </div>
                            </form>
                    <br/>
                            <form className={"form"}>

                                    <div className="form-group">
                                        { this.state.days.map(day =>
                                        <div className="form-row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor={"eidForLeave"}>{day}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <input id={day + ":time_start"} type={"text"} onChange={this.onTimeChange}/>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <input id={day + ":time_end"} type={"text"} onChange={this.onTimeChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        )}
                                    </div>


                                {/*<div className={"form-group"}>*/}
                                    {/*{*/}
                                        {/*this.state.days.map(day =>*/}
                                            {/*<div id={day} className={"row"}>*/}
                                                {/*<label htmlFor={"eidForLeave"}>{day}</label>*/}
                                                {/*<input id={day + ":time_start"} type={"text"} onChange={this.onTimeChange}/>*/}
                                                {/*<input id={day + ":time_end"} type={"text"} onChange={this.onTimeChange}/>*/}
                                            {/*</div>*/}
                                        {/*)*/}
                                    {/*}*/}
                                {/*</div>*/}
                            </form>
                            <button className={"btn btn-md btn-primary"} onClick={this.submit}>Assign</button>
                        </form>

            </div>
        );
    }
}