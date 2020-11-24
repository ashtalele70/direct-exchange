import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from "./logo.png";

class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                             <img
                                alt=""
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{" "}
                            Home
                        </Navbar.Brand>
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/logout">Log Out</Nav.Link>
                    </Nav>
            </Navbar>
        );
    }
}

export default Navigation;
