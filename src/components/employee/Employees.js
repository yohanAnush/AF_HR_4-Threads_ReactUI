import React,{Component} from 'react';
import Employee from './Employee';
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
                        <th>Department</th>
                        <th>Joined Date</th>
                        <th>#</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.employees.map((employee) => {
                            return <Employee key={employee.eid} employee={employee} getAllEmployees ={() => this.props.getAllEmployees()}  />
                        })
                    }
                </tbody>
            </table>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a class="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}