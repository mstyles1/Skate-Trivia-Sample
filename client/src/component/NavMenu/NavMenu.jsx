import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavMenu({ user }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/login">The Skater of the Year Quiz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/questions">Quiz</Nav.Link>
          </Nav>
          {user && (
            <Nav>
              <Nav.Link href="#" disabled>{user.user_email}</Nav.Link> {/* Display user email */}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}