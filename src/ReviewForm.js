import React, { Component } from 'react';
import { FormGroup, FormControl,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default class ReviewForm extends Component {
  constructor(props) {
    super(props);
    const { grade, notes } = this.props;

    this.state = {
      grade: grade ? grade : '',
      notes: notes ? notes : ''
    }
  }

  render() {

    return(
      <form>
        <FormGroup controlId="Grade">
          <FormControl
            value={this.state.grade}
            componentClass="select"
            placeholder="Grade"
            onChange={this._gradeChange.bind(this)}
          >
            <option value="Met Expectations">Met Expectations</option>
            <option value="Exceeded Expectations">Exceeded Expectations</option>
            <option value="Failed Expectations">Failed Expectations</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="Notes" >
          <FormControl
            value={this.state.notes}
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
        { notes: e.target.value }
      )
    );
  }

  _gradeChange(e) {
    this.setState(
      Object.assign(
        {},
        this.state,
        { grade: e.target.value }
      )
    );
  }
}
