import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import EmployeeForm from './EmployeeForm';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default class LoginRemoteContainer extends Component {
  render() {
    return(
      <Panel style={{ width: 500 }}>
        <EmployeeForm />
      </Panel>
    );
  }

}
