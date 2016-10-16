import React, { Component } from 'react';
import AdminBody from './AdminBody';

const DEV_URL = 'http://localhost:1337/parse/classes'
const EMPLOYEE_URL = DEV_URL + '/employee';
const REVIEW_URL = DEV_URL + '/review';
const APPLICATION_ID = 'performanceReview';

// in charge of injecting 'remote' behavior to the presentational components.
// the behaviors interact with a remote datasource for persistence
export default class AdminRemoteContainer extends Component {

  header = new Headers({'X-Parse-Application-Id': APPLICATION_ID });
  state = {
    employees: [],
    reviews: []
  };

  componentDidMount() {
    var options = {
      method: 'GET',
      headers: this.header
    };

    fetch(EMPLOYEE_URL, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign({}, this.state, {employees: data.results})
        )
      )

    fetch(REVIEW_URL, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign({}, this.state, {reviews: data.results})
        )
      )
  }

  render() {
    const {employees, reviews} = this.state;
    return (
        <AdminBody
          employees={employees}
          reviews={reviews}
          onAddEmployee={this._addEmployee}
          onUpdateEmployee={this._updateEmployee}
          onDeleteEmployee={this._deleteEmployee}
          onAddReview={this._addReview}
          onUpdateReview={this._updateReview}
        />
    );
  }

  _updateEmployee = (objectId, firstName, lastName) => {
    var options = {
      method: 'PUT',
      headers: this.header,
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      })
    };

    fetch(`${EMPLOYEE_URL}/${objectId}`, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign(
            {},
            this.state,
            {
              employees: this.state.employees
                .map((employee) =>
                  employee.objectId === objectId ?
                  {objectId, firstName, lastName}
                  :
                  employee
                )
           }
        )
      )
    );
  }

  _deleteEmployee = (objectId) => {
    var options = {
      method: 'DELETE',
      headers: this.header
    };

    fetch(`${EMPLOYEE_URL}/${objectId}`, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign(
            {},
            this.state,
            {
              employees: this.state.employees
                .filter((employee) => employee.objectId !== objectId)
           }
        )
      )
    );
  }

  _addEmployee = (firstName, lastName) => {
    var options = {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      })
    };

    fetch(EMPLOYEE_URL, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign(
            {},
            this.state,
            {
              employees: this.state.employees.concat({
                objectId: data.objectId,
                firstName,
                lastName
              })
           }
        )
      )
    );
  }

  _updateReview = (objectId, grade, notes) => {
    var options = {
      method: 'PUT',
      headers: this.header,
      body: JSON.stringify({
        grade,
        notes
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
                  Object.assign({}, review, {grade, notes})
                  :
                  review
                )
            }
         )
        )
      );
  }

  _addReview = (grade, notes, employeeId) => {
    var options = {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify({
        grade,
        notes,
        employeeId
      })
    };

    fetch(REVIEW_URL, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign(
            {},
            this.state,
            {
              reviews: this.state.reviews.concat({
                objectId: data.objectId,
                grade,
                notes,
                employeeId
              })
           }
        )
      )
    );
  }
}
