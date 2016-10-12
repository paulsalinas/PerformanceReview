import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import AdminRemoteContainer from './AdminRemoteContainer';
import LoginRemoteContainer from './LoginRemoteContainer';
import FeedbackRemoteContainer from './FeedbackRemoteContainer';


const MainNav = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Performance Review</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="/">Admin</NavItem>
      <NavItem eventKey={2} href="/Login">User</NavItem>
    </Nav>
  </Navbar>
);

// center the content
const MainContainer = ({children}) => (
  <div>
    <MainNav />
    <div style={{display: 'flex', justifyContent:'center'}}>
      {children}
    </div>
  </div>
)

const AdminView = () => (
  <MainContainer>
    <AdminRemoteContainer/>
  </MainContainer>
);

const LoginView = () => (
  <MainContainer>
    <LoginRemoteContainer/>
  </MainContainer>
);

const FeedbackView = ({params}) => (
  <MainContainer>
    <FeedbackRemoteContainer employeeId={params.employeeId}/>
  </MainContainer>
);

// set up the routing for the app
class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AdminView}/>
        <Route path="/login" component={LoginView}/>
        <Route path="/feedback/:employeeId" component={FeedbackView}/>
      </Router>
    );
  }
}

export default App;
