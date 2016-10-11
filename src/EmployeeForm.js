import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
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
    const { onDone } = this.props;
    const { firstName, lastName } = this.state;

    return(
      <div>
        <FormGroup controlId="firstName" >
          <FormControl
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={this.firstNameChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="lastName" >
          <FormControl
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={this.lastNameChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button onClick={(e) => onDone(firstName, lastName)}>
          Done
        </Button>
      </div>
    );
  }

}
