import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import AttendanceView from './components/attendance/AttendanceView';
import LeaveInsertView from './components/leave/LeaveInsertView';
import LeaveList from './components/leave/LeaveList';
import LeaveUpdateView from './components/leave/LeaveUpdateView';

import EmployeeHandler from './components/employee/EmployeeHandler';
import AssignEmployee from './components/employee/AssignEmployee';
import UpdateEmployee from './components/employee/UpdateEmployee';
import AddEmployee from './components/employee/AddEmployee';

import AddDepartmnet from './components/department/AddDepartment';
import DepartmentList from './components/department/DepartmentList';
import EditDepartment from './components/department/EditDepartment';
import GeneralList from './components/general_Information/GeneralList';
import AddGeneralList from './components/general_Information/AddGeneralList';



ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path='/dashboard' component={GeneralList}/>
            <Route path='/attendance' component={AttendanceView}/>
            <Route path='/leave/insert' component={LeaveInsertView}/>
            <Route path='/leaves' component={LeaveList}/>
            <Route path='/update-leave/:eid/on/:date' component={LeaveUpdateView}/>

            <Route path='/employee' component={EmployeeHandler}/>
            <Route path='/add-employee' component={AddEmployee}/>
            <Route path='/assign-employee' component={AssignEmployee}/>
            <Route path='/update-employee/:eid' component={UpdateEmployee}/>

            <Route path='/departments' component={DepartmentList}/>
            <Route path='/add-department' component={AddDepartmnet}/>
            <Route path='/edit-department/:did' component={EditDepartment}/>
            <Route path='/general' component={GeneralList}/>
            <Route path='/add-general' component={AddGeneralList}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
