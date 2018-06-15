import React, { Component } from 'react';

export default class ShiftListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shift: this.props.shift,
            eid: this.props.eid
        };
    }

    render() {
        let shift = this.state.shift;
        console.log(this.state.shift);
        return(
            <tr>
                <th scope="row">{ this.state.eid }</th>
                <td>{ shift[0].time_start } <br/> { shift[0].time_end } </td>
                <td>{ shift[1].time_start } <br/> { shift[1].time_end } </td>
                <td>{ shift[2].time_start } <br/> { shift[2].time_end } </td>
                <td>{ shift[3].time_start } <br/> { shift[3].time_end } </td>
                <td>{ shift[4].time_start } <br/> { shift[4].time_end } </td>
                <td>{ shift[5].time_start } <br/> { shift[5].time_end } </td>
                <td>{ shift[6].time_start } <br/> { shift[6].time_end } </td>
            </tr>
        );
    }
}
