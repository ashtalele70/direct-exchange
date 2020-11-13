import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
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
            </Navbar>
        );
    }
}

export default Navigation;
