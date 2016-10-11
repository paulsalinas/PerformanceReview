import React, { Component } from 'react';
import { ListGroupItem, Glyphicon, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import ReviewForm from './ReviewForm';

export default class ReviewRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  render() {
    const {
      grade,
      notes,
      date,
      feedback,
      employee
    } = this.props.review;

    const { onClickEdit } = this.props;
    const { editing } = this.state;

    return (

        editing ?

        <ListGroupItem>
          <Button
            style={{marginLeft: 5, marginBottom: 10}}
            onClick={() => this._onClickCancelHandler()}
          >
            <Glyphicon glyph="menu-left" />
          </Button>
          <ReviewForm grade={grade} notes={notes}/>
        </ListGroupItem>

        :

        <ListGroupItem>
          <h4>
            {grade}
            <Button
              style={{marginLeft: 5}}
              onClick={() => this._onClickEditHandler()}
            >
              <Glyphicon style={{ marginRight: 5 }} glyph="pencil" />
            </Button>
          </h4>

          <p>{notes}</p>

          {

            feedback ?
              <p>
                <span style={{fontWeight: 'bold'}}>
                  {employee.lastName + ', ' + employee.firstName + ': '}
                </span>
                {feedback}
              </p>

            :
            
            null
          }

        </ListGroupItem>
    );
  }

  _onClickEditHandler() {
    this.setState({ editing: true});
  }

  _onClickCancelHandler() {
    this.setState({ editing: false});
  }
}
