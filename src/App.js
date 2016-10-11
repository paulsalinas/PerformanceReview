import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import AdminRemoteContainer from './AdminRemoteContainer';

class App extends Component {
  _renderNav() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Performance Review</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Admin</NavItem>
          <NavItem eventKey={2} href="#">User</NavItem>
        </Nav>
      </Navbar>
    )
  }

  render() {
    return (
      <div>
        { this._renderNav() }
        <div style={{display: 'flex', justifyContent:'center'}}>
          <AdminRemoteContainer/>
        </div>
      </div>
    );
  }
}

export default App;
