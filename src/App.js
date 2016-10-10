import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import AdminBody from './AdminBody';

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
          <AdminBody
            employees={[
              { id: '1', firstName: 'Paul', lastName: 'Salinas'},
              { id: '2', firstName: 'Jeffrey', lastName: 'Macutay'},
              { id: '3', firstName: 'Michael', lastName: 'Ciufo'},
            ]}
            reviews={[
              {
                grade:'Met Expectations',
                notes:'He\'s a bad employee',
                date: new Date(2016, 10, 4),
                feedback: 'terrible review',
                employeeId: '1',
                employee: {
                  firstName: 'Paul',
                  lastName: 'Salinas'
                }
              },
              {
                grade:'Exceeded Expectations',
                notes:'Better!',
                date: new Date(2016, 9, 4),
                feedback: 'terrible review',
                employeeId: '1',
                employee: {
                  firstName: 'Michael',
                  lastName: 'Ciufo'
                }
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default App;
