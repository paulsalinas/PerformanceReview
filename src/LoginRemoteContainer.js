import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import EmployeeForm from './EmployeeForm';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const DEV_URL = 'http://localhost:1337/parse/classes'
const EMPLOYEE_URL = DEV_URL + '/employee';
const REVIEW_URL = DEV_URL + '/review';
const APPLICATION_ID = 'performanceReview';

// takes the firstName and lastName of the user and checks to see if they
// exist in the db. If they exist, sets up a redirect to their review page
export default class LoginRemoteContainer extends Component {
  render() {
    return(
      <Panel style={{ width: 500 }}>
        <EmployeeForm onDone={this._onSubmit.bind(this)}/>
      </Panel>
    );
  }

  _queryUri(firstName, lastName) {
     return `${EMPLOYEE_URL}?${encodeURI('where=' + JSON.stringify({firstName, lastName}))}`
  }

  _onSubmit(firstName, lastName) {
    var myHeaders = new Headers({'X-Parse-Application-Id': APPLICATION_ID });

    var options = {
      method: 'GET',
      headers: myHeaders,

    };

    fetch(this._queryUri(firstName, lastName), options)
      .then((response) => response.json())
      .then(({results}) => {
        if (results.length === 0) {
          alert('this employee does not exists');
          return;
        }

        // redirect to feedback route
        window.location.href = '/feedback/' + results[0].objectId;

      });
  }
}
