import React, { Component } from 'react';
import { ListGroupItem, Glyphicon, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default class ReviewRow extends Component {
  render() {
    const {
      grade,
      notes,
      date,
      feedback,
      employee
    } = this.props.review;
    const { onClickEdit } = this.props;

    return (
        <ListGroupItem>
          <h4>
            {grade}
            <Button style={{marginLeft: 5}}>
              <Glyphicon style={{ marginRight: 5 }} glyph="pencil" />
            </Button>
          </h4>

          <p>{notes}</p>
          <p>
            <span style={{fontWeight: 'bold'}}>
              {employee.lastName + ', ' + employee.firstName + ': '}
            </span>
            {feedback}
          </p>
        </ListGroupItem>
    );
  }
}
