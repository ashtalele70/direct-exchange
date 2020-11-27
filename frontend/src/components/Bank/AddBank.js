import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";
import CurrencyInput from "react-currency-input";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
class AddBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      bank_name: "",
      country: "",
      account_number: "",
      account_holder: "",
      account_address: "",
      primary_currency: "",
      bank_type: "",
      user_id: 1,
      rates: "",
    };
  }

  componentDidMount() {
    this.getRates();
  }
  submitHandler = (event) => {
    event.preventDefault();
    var values = {
      bank_name: this.state.bank_name,
      country: this.state.country,
      account_number: this.state.account_number,
      account_holder: this.state.account_holder,
      account_address: this.state.account_address,
      primary_currency: this.state.primary_currency,
      bank_type: this.state.bank_type,
      user_id: this.state.user_id,
    };

    console.log(values);
    axios
      .post("http://localhost:8080" + "/addbank", values)
      .then((res) => {
        if (res.status === 200) {
          console.log("yay");
          if (res.data) {
            this.setState({ show: true });
          }
        }
      })
      .catch((err) => {});
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  getRates = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );

    axios
      .get("http://localhost:8080" + "/rates")
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            this.setState({ rates: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  render() {
    return (
      <div>
        <Container className="m-5 d-flex justify-content-center">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="bankName">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  type="name"
                  value={this.state.bank_name}
                  onChange={(event) =>
                    this.setState({ bank_name: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="fromCurrency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={(event) =>
                    this.setState({ primary_currency: event.target.value })
                  }
                >
                  <option>Choose</option>
                  {this.state.rates &&
                    this.state.rates.map((e, key) => {
                      return (
                        <option key={key} value={e.Key}>
                          {e.source_currency}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="fromCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={(event) =>
                    this.setState({ country: event.target.value })
                  }
                >
                  <option>Choose</option>
                  {this.state.rates &&
                    this.state.rates.map((e, key) => {
                      return (
                        <option key={key} value={e.Key}>
                          {e.source_country}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="accountNumber">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  type="name"
                  value={this.state.account_number}
                  onChange={(event) =>
                    this.setState({ account_number: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="accountHolder">
                <Form.Label>Account Holder</Form.Label>
                <Form.Control
                  type="name"
                  value={this.state.account_holder}
                  onChange={(event) =>
                    this.setState({ account_holder: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="accountAddress">
                <Form.Label>Bank Address</Form.Label>
                <Form.Control
                  type="name"
                  value={this.state.account_address}
                  onChange={(event) =>
                    this.setState({ account_address: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="accountType">
                <Form.Label>Account type</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={(event) =>
                    this.setState({ bank_type: event.target.value })
                  }
                >
                  <option disabled>Choose</option>
                  <option value="1">{"Sending"}</option>
                  <option value="2">{"Recieving"}</option>
                  <option value="3">{"Sending/Recieving"}</option>
                  );
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button
              variant="primary"
              type="submit"
              onClick={this.submitHandler}
            >
              Add Bank
            </Button>
          </Form>
        </Container>
        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
          <Modal.Header>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b>Bank Added Successfully</b>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default AddBank;
