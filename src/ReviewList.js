import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import EmployeeRow from './EmployeeRow'
import ReviewRow from './ReviewRow'

export default class ReviewList extends Component {
  render() {
    const { reviews } = this.props;

    return (
        <ListGroup>
          {
            reviews.map((review) =>
              <ReviewRow
                key={review.objectId}
                review={review}
              />
            )
          }
        </ListGroup>
    );
  }
}
