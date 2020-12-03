import React, { Component } from "react";
import {
  Container,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import logo from "./logo.png";
import { withAuthentication } from "../Session/AuthUserContext";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      nickname: "",
      errorMsg: "",
    };
  }

  handleSubmit = () => {
    axios
      .put(
        process.env.REACT_APP_ROOT_URL +
          "/user?nickname=" +
          this.state.nickname +
          "&id=" +
          localStorage.getItem("userId")
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("nickname", this.state.nickname);
          this.setState({ show: false, errorMsg: "" });
        }
      })
      .catch((err) => {
        this.setState({ errorMsg: err.response.data.message });
      });
  };

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
            {this.props.firebase.auth.currentUser && (
              <NavDropdown title="Offer" id="basic-nav-dropdown">
                <NavDropdown.Item href="/offerDashboard">
                  Offer Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item href="/myOffers">My Offers</NavDropdown.Item>
                <NavDropdown.Item href="/PostOffer">
                  Post Exchange Offer
                </NavDropdown.Item>
                <NavDropdown.Item href="/viewTransactions">
                  View Accepted Offers
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {this.props.firebase.auth.currentUser && (
              <NavDropdown title="Bank" id="basic-nav-dropdown">
                <NavDropdown.Item href="/AddBank">Add Bank</NavDropdown.Item>
                <NavDropdown.Item href="/ViewBanks">
                  View Added Banks
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {this.props.firebase.auth.currentUser && (
              <Nav.Link href="/Rates">Exchange Rates</Nav.Link>
            )}
          </Nav>
          <Nav className="mr-auto"></Nav>
          {localStorage.getItem("nickname") != null && (
            <Navbar.Brand>
              Hello, {localStorage.getItem("nickname")}
              <FontAwesomeIcon
                icon={faPen}
                className="ml-1"
                onClick={() => this.setState({ show: true })}
              />
            </Navbar.Brand>
          )}
          <Nav>
            {!this.props.firebase.auth.currentUser && (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            {!this.props.firebase.auth.currentUser && (
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            )}
            {this.props.firebase.auth.currentUser && (
              <Nav.Link href="/logout">Log Out</Nav.Link>
            )}
          </Nav>
        </Navbar>
        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Nickname</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupNickname">
                <Form.Label>Enter New Nickname</Form.Label>
                <FormControl
                  onChange={(e) => this.setState({ nickname: e.target.value })}
                />
                <p className="text-danger">{this.state.errorMsg}</p>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ show: false })}
            >
              Clear
            </Button>
            <Button variant="primary" onClick={() => this.handleSubmit()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withAuthentication(Navigation);
