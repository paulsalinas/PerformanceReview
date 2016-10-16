import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FeedbackForm from './FeedbackForm';

const DEV_URL = 'http://localhost:1337/parse/classes'
const EMPLOYEE_URL = DEV_URL + '/employee';
const REVIEW_URL = DEV_URL + '/review';
const APPLICATION_ID = 'performanceReview';


// injects the 'remote datasource' behavior to it's inner presentational
// components.
export default class FeedbackRemoteContainer extends Component {
  state = {
    reviews: []
  };

  componentDidMount() {
    const {employeeId} = this.props;
    var myHeaders = new Headers({'X-Parse-Application-Id': APPLICATION_ID});

    var options = {
      method: 'GET',
      headers: myHeaders
    };

    const uri = `${REVIEW_URL}?${encodeURI('where=' + JSON.stringify({employeeId}))}`

    fetch(uri, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign({}, this.state, {reviews: data.results})
        )
      )
  }

  render() {
    const {reviews} = this.state;
    return(
      reviews.length === 0 ?

      <Panel style={{width: 500}}>
        "No Reviews to give feedback as of now. :)"
      </Panel>
      :
      <ListGroup style={{width: 500}}>
        {
          reviews.map((review) =>(
            <ListGroupItem key={review.objectId}>
              <FeedbackForm
                review={review}
                onDone={(feedback) => this._updateFeedback(
                  review.objectId,
                  feedback
                )}
              />
            </ListGroupItem>
          ))
        }
      </ListGroup>
    );
  }

  _updateFeedback(objectId, feedback) {
    var myHeaders = new Headers({'X-Parse-Application-Id': APPLICATION_ID});

    var options = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({
        feedback
      })
    };

    fetch(`${REVIEW_URL}/${objectId}`, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign(
            {},
            this.state,
            {
              reviews: this.state.reviews
                .map((review) =>
                  review.objectId === objectId ?
                  Object.assign({}, review, {feedback})
                  :
                  review
                )
            }
         )
        )
      );
  }
}
