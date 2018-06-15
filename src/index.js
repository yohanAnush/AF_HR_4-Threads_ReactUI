import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import AttendanceView from './components/attendance/AttendanceView';
import LeaveView from './components/leave/LeaveView';
import EmployeeDemo from './components/employee/EmployeeDemo';
import AddDepartmnet from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import DepartmentList from './components/department/DepartmentList';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path='/' component={App}/>
            <Route path='/attendance' component={AttendanceView}/>
            <Route path='/Leave' component={LeaveView}/>
            <Route path='/employee' component={EmployeeDemo}/>
            <Route path='/departments' component={DepartmentList}/>
            <Route path='/add-department' component={AddDepartmnet}/>
            <Route path='/edit-department' component={EditDepartment}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
