import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default class EmployeeForm extends Component {
  constructor(props) {
    super(props);

    const { firstName, lastName } = props;

    this.state = {
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : ''
    }
  }

  firstNameChange(e) {
    this.setState(
      Object.assign(
        {},
        this.state,
        { firstName: e.target.value }
      )
    );
  }

  lastNameChange(e) {
    this.setState(
      Object.assign(
        {},
        this.state,
        { lastName: e.target.value }
      )
    );
  }

  render() {
    return(
      <form>
        <FormGroup controlId="firstName" >
          <FormControl
            type="text"
            value={this.state.firstName}
            placeholder="First Name"
            onChange={this.firstNameChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="lastName" >
          <FormControl
            type="text"
            value={this.state.lastName}
            placeholder="Last Name"
            onChange={this.lastNameChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <button className='btn btn-default'>Done</button>
      </form>
    );
  }

}
