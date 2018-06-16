import React,{Component} from 'react';
import EmployeeListItem from './EmployeeListItem';
import PropTypes from 'prop-types';

export default class Employees extends Component{

    static get propTypes() {
        return {
            employees: PropTypes.array,
        }
    }

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(props) {
        this.setState(props)
    }

    render(){
        this.employees = this.props.employees;
        return <div>
            <table className={'table table-bordered table-hover'}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Position</th>
                        <th>Joined Date</th>
                        <th>Remove</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.employees.map((employee) => {
                            return <EmployeeListItem key={employee.eid} employee={employee} getAllEmployees ={() => this.props.getAllEmployees()}  />
                        })
                    }
                </tbody>
            </table>
        </div>
    }
}