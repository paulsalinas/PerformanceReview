import React, { Component } from 'react';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default class ReviewRow extends Component {
  render() {
    const { grade, notes, date } = this.props.review;
    const { onClickRow } = this.props;

    return (
        <ListGroupItem>
          <h4>{grade + ' - ' + date.toLocaleDateString() }</h4>
          <p>{notes}</p>
        </ListGroupItem>
    );
  }
}
