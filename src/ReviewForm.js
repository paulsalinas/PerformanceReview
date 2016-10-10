import React, { Component } from 'react';
import { FormGroup, FormControl,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
    }
  }

  render() {
    return(
      <form>
        <FormGroup controlId="Grade">
          <FormControl componentClass="select" placeholder="Grade">
            <option value="Met Expectations">Met Expectations</option>
            <option value="Exceeded Expectations">Exceeded Expectations</option>
            <option value="Failed Expectations">Failed Expectations</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="Notes" >
          <FormControl
            componentClass="textarea"
            placeholder="Enter Notes Here"
            onChange={this._reviewChange.bind(this)}
          />
        </FormGroup>
        <Button>Done</Button>
      </form>
    );
  }

  _reviewChange(e) {
    this.setState(
      Object.assign(
        {},
        this.state,
        { review: e.target.value }
      )
    );
  }
}
