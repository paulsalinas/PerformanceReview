import React, { Component } from 'react';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';

export default class EmployeeRow extends Component {
  render() {
    const { firstName, lastName } = this.props.employee;
    const { selected, onClickRow } = this.props;

    return (
        <ListGroupItem onClick={ onClickRow } active={ selected }>
          { `${lastName}, ${firstName}` }
          <Glyphicon
            style={{float: 'right'}}
            glyph="menu-right"
          />
        </ListGroupItem>
    );
  }
}
