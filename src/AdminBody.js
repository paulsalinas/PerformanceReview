import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Panel,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
  Glyphicon,
  Well
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import EmployeeList from './EmployeeList'
import EmployeeForm from './EmployeeForm'
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import './App.css';

const SHOW_EDIT_EMPLOYEE = 'SHOW_EDIT_EMPLOYEE';
const SHOW_ADD_REVIEW = 'SHOW_ADD_REVIEW';

export default class AdminBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAdd: false,
      selectedEmployeeId: null,
      toolbarShow: null
    };
  }

  render() {
    const {
      employees,
      reviews,
      onAddEmployee,
      onUpdateEmployee
     } = this.props;

    return (
      <Panel style={{ width: 800 }}>
        <Grid>
          <Row>
            <Col md={3}>
              <EmployeeList
                employees={employees}
                selectedId={this.state.selectedEmployeeId}
                onClickAdd={this._addEmployeeHandler.bind(this)}
                onClickEmployee={this._selectEmployeeHandler.bind(this)}
              />
            </Col>
            <Col md={5}>
              <ListGroup>
                {
                  this.state.showAdd || employees.length === 0 ?
                    <ListGroupItem header="Add New Employee">
                      <Well>
                        <EmployeeForm onDone={onAddEmployee}/>
                      </Well>
                    </ListGroupItem>
                  :
                  this._renderDetailPanel()
                }
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </Panel>
    );
  }

  _renderDetailPanel() {
    const { reviews } = this.props;
    const reviewsForSelectedEmployee = reviews
        .filter((review) => this.state.selectedEmployeeId === review.employeeId);



    return (
      this.state.selectedEmployeeId ?
      <ListGroup>
        <ListGroupItem>
          <ButtonGroup
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button onClick={(e) => this._setToolBarState(SHOW_EDIT_EMPLOYEE) }>
              <Glyphicon style={{ marginRight: 5 }} glyph="pencil"/>
              Edit Employee
            </Button>
            <Button onClick={(e) => this._setToolBarState(SHOW_ADD_REVIEW)}>
              <Glyphicon style={{ marginRight: 5 }} glyph="plus"/>
              Add Review
            </Button>
            <Button bsStyle={'danger'}>
              <Glyphicon style={{ marginRight: 5 }} glyph="trash" />
              Delete Employee
            </Button>
          </ButtonGroup>
          {this._renderEditPanel()}
        </ListGroupItem>
        {
          reviewsForSelectedEmployee.length > 0 ?
            <ReviewList reviews={reviewsForSelectedEmployee}/>
          :
          <p>There are no reviews...</p>
        }
      </ListGroup>

      :

      <Panel bsStyle="info">
        Please select an employee or add a new employee
      </Panel>
    );
  }

  _renderEditPanel() {
    const { employees, onUpdateEmployee } = this.props;
    const selectedEmployee = employees
      .find((employee) => employee.objectId === this.state.selectedEmployeeId);

    switch (this.state.toolbarShow) {
      case SHOW_ADD_REVIEW:
        return (
          <Well style={{ marginTop: 10}}>
            <ReviewForm />
          </Well>
        );
      case SHOW_EDIT_EMPLOYEE:
        return (
          <Well  style={{ marginTop: 10}}>
            <EmployeeForm
              firstName={selectedEmployee.firstName}
              lastName={selectedEmployee.lastName}
              onDone={(firstName, lastName) => onUpdateEmployee(
                selectedEmployee.objectId,
                firstName,
                lastName
              )}
            />
          </Well>
        );
      default:
        return null;
    }
  }

  _setToolBarState(toolBarState) {
    this.setState(
      Object.assign(
        {},
        this.state,
        {
          toolbarShow:
            this.state.toolbarShow === toolBarState ?
            null
            :
            toolBarState
        }
      )
    );
  }

  _addEmployeeHandler() {
    this.setState(
      Object.assign(
        {},
        this.state,
        {
          showAdd: true,
          selectedEmployeeId: null
        }
      )
    );
  }

  _selectEmployeeHandler(employeeId) {
    console.log(employeeId);
    this.setState(
      Object.assign(
        {},
        this.state,
        {
          showAdd: false,
          selectedEmployeeId: employeeId,
          toolbarShow: null
        }
      )
    );
  }
}
