import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default class EmployeeForm extends Component {
  state = {
    firstName: this.props.firstName ? this.props.firstName : '',
    lastName: this.props.lastName ? this.props.lastName : ''
  };

  render() {
    const {onDone} = this.props;
    const {firstName, lastName} = this.state;

    return(
      <div>
        <FormGroup controlId="firstName" >
          <FormControl
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={this.firstNameChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="lastName" >
          <FormControl
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={this.lastNameChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button onClick={(e) => onDone(firstName, lastName)}>
          Done
        </Button>
      </div>
    );
  }

  firstNameChange = (e) => {
    this.setState({
      ...this.state,
      firstName: e.target.value
    });
  }

  lastNameChange = (e) => {
    this.setState({
      ...this.state,
      lastName: e.target.value
    });
  }
}
