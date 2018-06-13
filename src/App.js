import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AttendanceList from './components/attendance/AttendanceList';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className={"card"}>
                    <AttendanceList/>
                </div>
            </div>
        );
    }
}

export default App;
