import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import EmployeeRow from './EmployeeRow'
import './App.css';

export default class EmployeeList extends Component {
  render() {

    const {
      employees,
      mode,
      onClickAdd,
      onClickEmployee,
      selectedId
    } = this.props;

    return (
      <div>
        <ListGroup>
          <ListGroupItem
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <h4>Employees</h4>
            <Button onClick={onClickAdd}>
              <Glyphicon glyph='plus'/>
            </Button>
          </ListGroupItem>
        </ListGroup>
        <ListGroup>
          {
            employees
            .map((employee) =>
              (<EmployeeRow
                employee={employee}
                selected={ selectedId === employee.id }
                onClickRow={(e) =>  onClickEmployee(employee.id) }
               />)
            )
          }
        </ListGroup>
      </div>
    );
  }
}
