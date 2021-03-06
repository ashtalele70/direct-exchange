import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";

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
      bank_type: 1,
      user_id: localStorage.getItem("userId"),
      rates: "",
    };
  }

  componentDidMount() {
    this.getRates();
    this.getCurrencies();
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
      .post(process.env.REACT_APP_ROOT_URL + "/addbank", values)
      .then((res) => {
        if (res.status === 200) {
          console.log("yay");
          this.setState({ show: true });
        }
      })
      .catch((err) => {});
  };

  getRates = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );

    axios
      .get(process.env.REACT_APP_ROOT_URL + "/rates")
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

  getCurrencies = () => {
    axios
        .get(process.env.REACT_APP_ROOT_URL + "/currencies")
        .then((res) => {
          if (res.status === 200) {
            if (res.data) {
              this.setState({ currencies: res.data });
            }
          }
        })
        .catch((err) => {});
  };

  currencyChange = (event) => {
    this.setState({ primary_currency : event.target.value });
    axios
        .get(process.env.REACT_APP_ROOT_URL + "/country?currency=" + event.target.value)
        .then((res) => {
          if (res.status === 200) {
            if (res.data) {
              this.setState({ country: res.data });
            }
          }
        })
        .catch((err) => {});

  };

  render() {
    return (
      <div>
        {this.state.show == true && <Alert variant="success" onLoad={setTimeout(() =>  this.setState({ show: false }), 3000)}
        onClose={() => this.setState({ show: false })} dismissible>
          Bank Added Successfully
        </Alert>}
        <h1 className="text-center mt-5">Add Bank</h1>
        <Container className="d-flex justify-content-center">          
          <Form className="mt-5">
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
                  onChange={this.currencyChange}
                >
                  <option>Choose</option>
                  {this.state.currencies
                  &&
                  this.state.currencies.map((e, key) => {
                    return (
                        <option key={key} value={e.Key}>
                          {e}
                        </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="fromCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    as="text"
                    // value=
                    readOnly="readOnly"
                >
                  {/*<option>Choose</option>*/}
                  {this.state.country}
                  {/*{this.state.rates &&*/}
                  {/*  [...new Set(this.state.rates)].map((e, key) => {*/}
                  {/*    return (*/}
                  {/*      <option key={key} value={e.Key}>*/}
                  {/*        {e.source_country}*/}
                  {/*      </option>*/}
                  {/*    );*/}
                  {/*  })}*/}
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
                  defaultValue={this.state.bank_type}
                  onChange={(event) =>
                    this.setState({ bank_type: event.target.value })
                  }
                >
                  <option value="1">{"Sending"}</option>
                  <option value="2">{"Receiving"}</option>
                  <option value="3">{"Sending/Receiving"}</option>
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
      </div>
    );
  }
}
export default AddBank;
