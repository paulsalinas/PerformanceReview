import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ReviewRow from './ReviewRow'

export default class ReviewList extends Component {
  render() {
    const {reviews, onEdit} = this.props;

    return (
        <ListGroup>
          {
            reviews.map((review) =>
              <ReviewRow
                key={review.objectId}
                review={review}
                onEdit={(grade, notes) => onEdit(review.objectId, grade, notes)}
              />
            )
          }
        </ListGroup>
    );
  }
}
