import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

const Header = ({name, logged, logoutBut}) =>  (
    <header style={{height: '10vh'}}>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <span>WebChat</span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem>
                {logged ? `Logged in as ${name}` : 'Hello guest, Please log in below'}
              </NavItem>
            </Nav>
            {logoutBut ?
            <Nav pullRight>
              <NavItem onClick={() => logoutBut()}>
                Logout
              </NavItem>
            </Nav>: null}
          </Navbar.Collapse>
        </Navbar>
    </header>
);

export default Header;