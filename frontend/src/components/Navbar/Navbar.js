import React, { Component } from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from "./logo.png";
import {withAuthentication} from "../Session/AuthUserContext";

class Navigation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
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
                        <Nav>
                            {this.props.firebase.auth.currentUser && <NavDropdown title="Offer" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/offerDashboard">Offer Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="/myOffers">My Offers</NavDropdown.Item>
                                <NavDropdown.Item href="/PostOffer">Post Exchange Offer</NavDropdown.Item>
                                <NavDropdown.Item href="/viewTransactions">View Accepted Offers</NavDropdown.Item>
                            </NavDropdown>}
                            {this.props.firebase.auth.currentUser && <Nav.Link href="/AddBank">Add Bank</Nav.Link>}
                            {this.props.firebase.auth.currentUser && <Nav.Link href="/Rates">Exchange Rates</Nav.Link>}
                        </Nav>
                    <Nav className="mr-auto">
                    </Nav>

                    <Nav>
                        {!this.props.firebase.auth.currentUser && <Nav.Link href="/login">Login</Nav.Link>}
                        {!this.props.firebase.auth.currentUser && <Nav.Link href="/signup">Sign Up</Nav.Link>}
                        {this.props.firebase.auth.currentUser && <Nav.Link href="/logout">Log Out</Nav.Link>}
                    </Nav>
            </Navbar>

            </div>
        );
    }
}

export default withAuthentication(Navigation);
