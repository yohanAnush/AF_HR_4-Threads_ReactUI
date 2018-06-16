import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LeaveListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leave: this.props.leave
        };
    }

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        let leave = this.state.leave;
        return(
            <tr>
                <th scope="row">{ leave.eid }</th>
                <td>{ leave.start }</td>
                <td>{ leave.end }</td>
                <td>
                    <button className={"btn btn-md btn-success"}>
                        <Link style={{color:"#FFF"}}  to={'update-leave/'+leave.eid+'/on/'+leave.start}><i className="fa fa-edit"></i></Link>
                    </button>
                </td>
            </tr>
        );
    }
}
