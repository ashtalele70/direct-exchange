import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav'
import logo from "./logo.png";

import { Link } from "react-router-dom";
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
                <Nav.Link className="pl-5" href="/Rates">
                    Exchange Rates
                </Nav.Link>
                <Nav.Link className="pl-5" href="/PostOffer">
                    Post Exchange Offer
                </Nav.Link>
            </Navbar>
        );
    }
}

export default Navigation;
