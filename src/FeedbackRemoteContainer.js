import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const DEV_URL = 'http://localhost:1337/parse/classes'
const EMPLOYEE_URL = DEV_URL + '/employee';
const REVIEW_URL = DEV_URL + '/review';
const APPLICATION_ID = 'performanceReview';

// takes the firstName and lastName of the user and checks to see if they
// exist in the db. If they exist, sets up a redirect to their review page
export default class FeedbackRemoteContainer extends Component {
  render() {
    return(
      <Panel style={{ width: 300 }}>
        {this.props.employeeId}
      </Panel>
    );
  }
}
