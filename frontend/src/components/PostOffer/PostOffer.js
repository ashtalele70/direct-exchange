import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";
import CurrencyInput from "react-currency-input";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class PostOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      bankCurrency: "USD",
      bankCountry: "United States",
      source_country: "United",
      source_currency: "",
      remit_amount: "",
      destination_country: "United",
      destination_currency: "",
      exchange_rate: "",
      expiration_date: "",
      allow_counter_offer: 1,
      allow_split_offer: 1,
      offer_status: "Pending",
      is_counter: 0,
      rates: "",
      amount: "0.00",
      remit_amount_destination: 0,
      user_id: 1,
      source_bank: false,
      destination_bank: false,
      bank_message: "",
      close: false,
    };
  }

  componentDidMount() {
    this.getRates();
  }

  getInitialState() {
    return { amount: "0.00" };
  }

  handleChange = (event, maskedvalue, floatvalue) => {
    this.setState({
      amount: maskedvalue,
      remit_amount_destination: maskedvalue * this.state.exchange_rate,
    });
  };

  exchageRate() {
    var rates = this.state.rates;
    if (
      this.state.source_currency !== "" &&
      this.state.destination_currency !== ""
    ) {
      this.state.rates.map((gh, i) => {
        if (
          this.state.source_currency === gh.source_currency &&
          this.state.destination_currency === gh.destination_currency
        ) {
          console.log(gh);
          this.setState({ exchange_rate: gh.rate });
        }
      });
    }
  }

  sourceCurrencyChange = (event) => {
    this.setState({ source_currency: event.target.value }, () => {
      this.exchageRate();
    });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  sourceCountryChange = (event) => {
    this.setState({ source_country: event.target.value }, () => {
      let params = new URLSearchParams();
      params.set("source_country", this.state.source_country);
      params.set("source_currency", this.state.source_currency);
      params.set("bank_type", 1);
      params.set("user_id", this.state.user_id);
      axios
        .get("http://localhost:8080" + "/getuserbank?" + params.toString())
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length !== 0) {
              this.setState({ source_bank: true });
            } else {
              var message =
                this.state.bank_message +
                " \n country: " +
                this.state.source_currency +
                " currency: " +
                this.state.source_country;

              this.setState({ bank_message: message });
            }
          }
        })
        .catch((err) => {});
    });
  };

  destinationCurrencyChange = (event) => {
    this.setState({ destination_currency: event.target.value }, () => {
      this.exchageRate();
    });
  };

  destinationCountryChange = (event) => {
    this.setState({ destination_country: event.target.value }, () => {
      let params = new URLSearchParams();
      params.set("source_country", this.state.destination_country);
      params.set("source_currency", this.state.destination_currency);
      params.set("bank_type", 2);
      params.set("user_id", this.state.user_id);
      axios
        .get("http://localhost:8080" + "/getuserbank?" + params.toString())
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length !== 0) {
              this.setState({ destination_bank: true });
            } else {
              var message =
                this.state.bank_message +
                "\ncountry: " +
                this.state.destination_country +
                " currency: " +
                this.state.destination_currency;
              console.log(message);
              this.setState({ bank_message: message });
            }
          }
        })
        .catch((err) => {});
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    var values = {
      user_id: 1,
      source_country: this.state.source_country,
      source_currency: this.state.source_currency,
      remit_amount: this.state.amount,
      destination_country: this.state.destination_country,
      destination_currency: this.state.destination_currency,
      exchange_rate: this.state.exchange_rate,
      expiration_date: this.state.expiration_date,
      allow_counter_offer: this.state.allow_counter_offer,
      allow_split_offer: this.state.allow_split_offer,
      offer_status: "INIT",
      is_counter: 0,
    };
    console.log(values);
    if (
      this.state.source_bank === false &&
      this.state.destination_bank === false
    ) {
      axios
        .post("http://localhost:8080" + "/postoffer", values)
        .then((res) => {
          if (res.status === 200) {
            console.log("yay");
            if (res.data) {
              console.log(res.data);
            }
          }
        })
        .catch((err) => {});
    } else {
      console.log("o");
      console.log(this.state.bank_message);
      this.setState({ show: true });
    }
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
      <div style={{ paddingTop: 10 }}>
        <Container className="m-5 d-flex justify-content-center">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="fromCurrency">
                <Form.Label>From (Currency) </Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={this.sourceCurrencyChange}
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
                <Form.Label>From (Country) </Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={this.sourceCountryChange}
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
              <Form.Group as={Col} controlId="toCurrency">
                <Form.Label>To (Currency)</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={this.destinationCurrencyChange}
                >
                  <option>Choose</option>

                  {this.state.rates &&
                    this.state.rates.map((e, key) => {
                      return (
                        <option key={key} value={e.Key}>
                          {e.destination_currency}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="toCountry">
                <Form.Label>To (Country)</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  onChange={this.destinationCountryChange}
                >
                  <option>Choose</option>

                  {this.state.rates &&
                    this.state.rates.map((e, key) => {
                      return (
                        <option key={key} value={e.Key}>
                          {e.destination_country}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="sendAmount">
                <Form.Label> Send amount &nbsp; </Form.Label>
                <CurrencyInput
                  value={this.state.amount}
                  onChangeEvent={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="echangeRate">
                <Form.Label>Exchange rate</Form.Label>
                <Form.Control
                  type="name"
                  readOnly="readOnly"
                  value={this.state.exchange_rate}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="recieveAmount">
                <Form.Label>Recieve amount</Form.Label>
                <Form.Control
                  type="name"
                  value={this.state.remit_amount_destination}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="expiryDate">
                <Form.Label>Expiry Date for the offer</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Expiry Date for the offer"
                  onChange={(event) =>
                    this.setState({ expiration_date: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <OverlayTrigger
                overlay={<Tooltip id={`tooltip-top`}>Allows</Tooltip>}
              >
                <Form.Group as={Col} id="allowCounterOffer">
                  <Form.Check
                    type="switch"
                    label="Allow Counter Offer"
                    id="custom-switch-counter"
                    checked={this.state.allow_counter_offer}
                    onChange={(event) =>
                      this.setState({
                        allow_counter_offer: event.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </OverlayTrigger>

              <OverlayTrigger
                overlay={<Tooltip id={`tooltip-top`}>allow</Tooltip>}
              >
                <Form.Group as={Col} id="allowSplitOffer">
                  <Form.Check
                    type="switch"
                    label="Allow split Offer"
                    id="custom-switch-split"
                    checked={this.state.allow_split_offer}
                    onChange={(event) =>
                      this.setState({ allow_split_offer: event.target.checked })
                    }
                  />
                </Form.Group>
              </OverlayTrigger>
            </Form.Row>

            <OverlayTrigger
              overlay={<Tooltip id={`tooltip-top`}>allow</Tooltip>}
            >
              <Button
                variant="primary"
                type="submit"
                onClick={this.submitHandler}
              >
                Post Offer
              </Button>
            </OverlayTrigger>
          </Form>
        </Container>

        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b>Please add bank details for</b>
            {this.state.bank_message}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PostOffer;
