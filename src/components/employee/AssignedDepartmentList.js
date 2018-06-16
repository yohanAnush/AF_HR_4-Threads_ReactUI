import React,{Component} from 'react';
import AssignedItem from './AssignedItem';
import PropTypes from 'prop-types';

export default class AssignedDepartmentList extends Component{

    static get propTypes() {
        return {
            departments: PropTypes.array,
        }
    }

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(props) {
        this.setState(props)
    }

    render(){
        this.departments = this.props.departments;
        return <div>
            <table className={'table table-bordered table-hover'}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.departments.map((item ,i) => {
                        console.log(item.did);
                        return <AssignedItem key={item.did} department={item} unAssignDepartment={this.props.unAssignDepartment}  />
                    })
                }
                </tbody>
            </table>
        </div>
    }
}