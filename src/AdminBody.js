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
      onAddEmployee
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
    const {
      reviews,
      onDeleteEmployee,
      onUpdateReview,
      employees,
    } = this.props;
    const { selectedEmployeeId } = this.state;

    const selectedEmployee = employees
      .find((e) => e.objectId === selectedEmployeeId);

    const reviewsForSelectedEmployee = reviews
      .filter((review) => this.state.selectedEmployeeId === review.employeeId)
      .map((review) => ({
        ...review,
        employee: selectedEmployee
        })
      );

    const deleteHandler = (e) => {
      onDeleteEmployee(selectedEmployeeId)
      this.setState(Object.assign({}, this.state, { selectedEmployeeId: null }));
    };

    return (
      this.state.selectedEmployeeId ?
      <div>
        <Panel>
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
            <Button
              bsStyle={'danger'}
              onClick={deleteHandler}
            >
              <Glyphicon style={{ marginRight: 5 }} glyph="trash" />
              Delete Employee
            </Button>
          </ButtonGroup>
          {this._renderEditPanel()}
        </Panel>
        {
          reviewsForSelectedEmployee.length > 0 ?
            <ReviewList
              reviews={reviewsForSelectedEmployee}
              onEdit={onUpdateReview}
            />
          :
          <p>There are no reviews...</p>
        }
      </div>

      :

      <Panel bsStyle="info">
        Please select an employee or add a new employee
      </Panel>
    );
  }

  _renderEditPanel() {
    const { employees, onUpdateEmployee, onAddReview } = this.props;
    const { selectedEmployeeId } = this.state;
    const selectedEmployee = employees
      .find((employee) => employee.objectId === selectedEmployeeId);

    const updateHandler = (firstName, lastName) => onUpdateEmployee(
      selectedEmployee.objectId,
      firstName,
      lastName
    );

    const addReviewHandler = (grade, notes) => onAddReview(
      grade,
      notes,
      selectedEmployeeId
    );

    switch (this.state.toolbarShow) {
      case SHOW_ADD_REVIEW:
        return (
          <Well style={{ marginTop: 10}}>
            <ReviewForm
              onDone={addReviewHandler}
            />
          </Well>
        );
      case SHOW_EDIT_EMPLOYEE:
        return (
          <Well  style={{ marginTop: 10}}>
            <EmployeeForm
              firstName={selectedEmployee.firstName}
              lastName={selectedEmployee.lastName}
              onDone={updateHandler}
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
