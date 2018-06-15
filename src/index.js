import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import AttendanceView from './components/attendance/AttendanceView';
import LeaveInsertView from './components/leave/LeaveInsertView';
import ShiftInsertView from './components/shift/ShiftInsertView';
import ShiftListView from './components/shift/ShiftListView';

import EmployeeHandler from './components/employee/EmployeeHandler';
import AssignEmployee from './components/employee/AssignEmployee';
import UpdateEmployee from './components/employee/UpdateEmployee';
import AddEmployee from './components/employee/AddEmployee';

import AddDepartmnet from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import DepartmentList from './components/department/DepartmentList';



ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path='/' component={App}/>
            <Route path='/attendance' component={AttendanceView}/>
            <Route path='/leave/insert' component={LeaveInsertView}/>
            <Route path='/shift/insert' component={ShiftInsertView}/>
            <Route path='/shifts/' component={ShiftListView}/>

            <Route path='/employee' component={EmployeeHandler}/>
            <Route path='/add-employee' component={AddEmployee}/>
            <Route path='/assign-employee' component={AssignEmployee}/>
            <Route path='/update-employee/:eid' component={UpdateEmployee}/>

            <Route path='/departments' component={DepartmentList}/>
            <Route path='/add-department' component={AddDepartmnet}/>
            <Route path='/edit-department' component={EditDepartment}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
