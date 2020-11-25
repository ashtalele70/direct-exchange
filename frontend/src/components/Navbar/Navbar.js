import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from "./logo.png";
import {withAuthentication} from "../Session/AuthUserContext";

class Navigation extends Component {
    constructor(props) {
        super(props);
    }
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
                        {!this.props.firebase.auth.currentUser && <Nav.Link href="/login">Login</Nav.Link>}
                        {!this.props.firebase.auth.currentUser && <Nav.Link href="/signup">Sign Up</Nav.Link>}
                        {this.props.firebase.auth.currentUser && <Nav.Link href="/logout">Log Out</Nav.Link>}
                    </Nav>
            </Navbar>
        );
    }
}

export default withAuthentication(Navigation);
