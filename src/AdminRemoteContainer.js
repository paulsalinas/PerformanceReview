import React, { Component } from 'react';
import AdminBody from './AdminBody';

const DEV_URL = 'http://localhost:1337/parse/classes'
const EMPLOYEE_URL = DEV_URL + '/employee';
const REVIEW_URL = DEV_URL + '/review';
const APPLICATION_ID = 'performanceReview';

export default class AdminRemoteContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      reviews: []
    }
  }

  componentDidMount() {
    var myHeaders = new Headers({'X-Parse-Application-Id': APPLICATION_ID });

    var options = {
      method: 'GET',
      headers: myHeaders
    };

    fetch(EMPLOYEE_URL, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign({}, this.state, { employees: data.results })
        )
      )

    fetch(REVIEW_URL, options)
      .then((response) => response.json())
      .then((data) =>
        this.setState(
          Object.assign({}, this.state, { reviews: data.results })
        )
      )
  }

  render() {
    const {employees, reviews} = this.state;
    console.log(employees);
    console.log(reviews);
    return (
        <AdminBody
          employees={employees}
          reviews={reviews}
          onAddEmployee={this._addEmployee.bind(this)}
          onUpdateEmployee={this._updateEmployee.bind(this)}
          onDeleteEmployee={this._deleteEmployee.bind(this)}
          onAddReview={this._addReview.bind(this)}
        />
    );
  }

  _updateEmployee(objectId, firstName, lastName) {
    var myHeaders = new Headers({'X-Parse-Application-Id': APPLICATION_ID });

    var options = {
      method: 'PUT',
      headers: myHeaders,
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
                  { objectId, firstName, lastName }
                  :
                  employee
                )
           }
        )
      )
    );
  }

  _deleteEmployee(objectId) {
    var myHeaders = new Headers({'X-Parse-Application-Id': APPLICATION_ID });

    var options = {
      method: 'DELETE',
      headers: myHeaders
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

  _addEmployee(firstName, lastName) {
    var myHeaders = new Headers({'X-Parse-Application-Id': APPLICATION_ID });

    var options = {
      method: 'POST',
      headers: myHeaders,
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

  _addReview(grade, notes, employeeId) {
    var myHeaders = new Headers({'X-Parse-Application-Id': APPLICATION_ID });

    var options = {
      method: 'POST',
      headers: myHeaders,
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
