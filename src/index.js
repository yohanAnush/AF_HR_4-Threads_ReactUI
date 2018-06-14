import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import AttendanceView from './components/attendance/AttendanceView';
import LeaveView from './components/leave/LeaveView';
import EmployeeDemo from './components/employee/EmployeeDemo';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path='/' component={App}/>
            <Route path='/attendance' component={AttendanceView}/>
            <Route path='/Leave' component={LeaveView}/>
            <Route path='/employee' component={EmployeeDemo}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
