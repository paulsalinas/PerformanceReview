import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

export default class ReviewForm extends Component {
  state = {
    grade: this.props.grade ? this.props.grade : "Met Expectations",
    notes: this.props.notes ? this.props.notes : ""
  };

  render() {
    const { onDone } = this.props;
    const { grade, notes } = this.state;

    return (
      <div>
        <FormGroup controlId="Grade">
          <FormControl
            value={grade}
            componentClass="select"
            placeholder="Grade"
            onChange={this._gradeChange}
          >
            <option value="Met Expectations">Met Expectations</option>
            <option value="Exceeded Expectations">Exceeded Expectations</option>
            <option value="Failed Expectations">Failed Expectations</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="Notes">
          <FormControl
            value={notes}
            componentClass="textarea"
            placeholder="Enter Notes Here"
            onChange={this._reviewChange}
          />
        </FormGroup>
        <Button onClick={e => onDone(grade, notes)}>Done</Button>
      </div>
    );
  }

  _reviewChange = e => {
    this.setState({
      notes: e.target.value
    });
  };

  _gradeChange = e => {
    this.setState({
      grade: e.target.value
    });
  };
}
