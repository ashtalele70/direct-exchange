import React, { Component } from "react";
import {
  Form,
  Card,
  CardDeck,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import axios from "axios";

class AutoMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: 0,
      remit_amount: 0,
      singleOffers: [],
      splitOffers: [],
      user: "",
      switch: true,
      offerId2: 0,
      offerId3: 0,
      show: false,
      new_remit_amount: 0,
      exchange_rate: 0,
      showSuccess: false,
      source_currency: ""
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        offerId: this.props.location.state.offer.id,
        remit_amount: this.props.location.state.remit_amount,
        exchange_rate: this.props.location.state.exchange_rate,
        source_currency: this.props.location.state.offer.source_currency,
      });
      this.getMatchingOffers(this.props.location.state.offer.id);
    }
  }
  getUser = (user_id) => {
    axios
      .get(process.env.REACT_APP_ROOT_URL + "/user/" + user_id)
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            return res.data.nickname;
          }
        }
      })
      .catch((err) => { });
  };
  getMatchingOffers = (offerId) => {
    let paramsSingle = new URLSearchParams();
    paramsSingle.set("id", offerId);

    axios
      .get(
        process.env.REACT_APP_ROOT_URL +
        "/getSingleMatches?" +
        paramsSingle.toString()
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            this.setState({ singleOffers: res.data });
          }
        }
      })
      .catch((err) => { });

    let paramsSplit = new URLSearchParams();
    paramsSplit.set("id", offerId);

    axios
      .get(
        process.env.REACT_APP_ROOT_URL +
        "/getSplitMatches?" +
        paramsSplit.toString()
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            this.setState({ splitOffers: res.data });
          }
        }
      })
      .catch((err) => { });
  };

  onSwitchAction = () => {
    let switchValue = !this.state.switch;
    this.setState({ switch: switchValue });
  };

  submitHandler = (offer2, offer3) => {
    /*
    console.log("hmok");
    console.log(offerId2.remit_amount);
    console.log(offerId3.remit_amount);
    console.log(this.state.remit_amount);
    console.log(
      (offerId2.remit_amount + offerId3.remit_amount) / offerId2.exchange_rate
    );
    */
    if (offer3 && offer2.destination_currency != offer3.destination_currency) {
      var matching_offer;
      if (this.state.source_currency == offer3.destination_currency) {
        matching_offer = Math.abs(offer2.remit_amount - offer3.remit_amount / this.state.exchange_rate);
      } else {
        matching_offer = Math.abs(offer2.remit_amount / this.state.exchange_rate - offer3.remit_amount);
      }

      matching_offer = parseFloat(matching_offer.toFixed(2));

      console.log(matching_offer);
      if (matching_offer != this.state.remit_amount) {
        console.log(matching_offer);
        console.log(this.state.remit_amount);
        this.setState({
          show: true,
          offerId2: offer2.id,
          offerId3: offer3 ? offer3.id : null,
          new_remit_amount: matching_offer,
        });
      } else {
        if (offer3) {
          this.AcceptOffer(offer2.id, offer3.id);
        } else {
          this.AcceptOffer(offer2.id);
        }
      }
    } else {
      var matching_offer =
        (offer2.remit_amount + (offer3 ? offer3.remit_amount : 0)) /
        this.state.exchange_rate;
      console.log(matching_offer);
      matching_offer = parseFloat(matching_offer.toFixed(2));
      if (matching_offer != this.state.remit_amount) {
        console.log(matching_offer);
        console.log(this.state.remit_amount);
        this.setState({
          show: true,
          offerId2: offer2.id,
          offerId3: offer3 ? offer3.id : null,
          new_remit_amount: matching_offer,
        });
      } else {
        if (offer3) {
          this.AcceptOffer(offer2.id, offer3.id);
        } else {
          this.AcceptOffer(offer2.id);
        }
      }
    }

  };

  AcceptOffer = (offerId2, offerId3 = null) => {
    this.setState({ show: false });
    let paramAccept = new URLSearchParams();
    paramAccept.set("offerId1", this.state.offerId);
    paramAccept.set("offerId2", offerId2);

    if (offerId3) {
      paramAccept.set("offerId3", offerId3);
    }

    axios
      .post(
        process.env.REACT_APP_ROOT_URL +
        "/acceptedOffer?" +
        paramAccept.toString()
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({ showSuccess: true });
          if (res.data) {
            console.log(res.data);
            this.setState({ splitOffers: res.data });
          }
        }
      })
      .catch((err) => { });
  };

  makeCounterOffer = (offer) => {
    this.props.history.push({
      pathname: '/counterOffer',
      offer: this.props.location.state.offer,
      otherPartyOfferId: offer.id,
      otherPartyUserId: offer.user_id
    })
  };

  checkSplitRemitAmount = (offer1, offer2, pos) => {
    if (offer1.source_currency != offer2.source_currency) {
      if ((offer1.remit_amount * offer1.exchange_rate) > offer2.remit_amount && offer1.allow_counter_offer == 1) return true;
      if (pos == 1 && ((offer1.remit_amount * offer1.exchange_rate) == offer2.remit_amount) && offer1.allow_counter_offer == 1) return true;
    } else {
      if (offer1.remit_amount > offer2.remit_amount && offer1.allow_counter_offer == 1) return true;
      if (pos == 1 && offer1.remit_amount == offer2.remit_amount && offer1.allow_counter_offer == 1) return true;
    }
    return false;
  }

  render() {
    {
      this.state.singleOffers.length == 0 &&
        this.state.splitOffers.length == 0 && (
          <Alert className="mt-5" variant="danger">
            No matching offers
          </Alert>
        );
    }
    const singleOffers = this.state.singleOffers.map((offer, index) => (
      <div>
        <Card border="primary" >
          <Card.Header>
            <b>{offer.nickname}'s Offer</b>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <b>Offer Currency: </b>
              {offer.source_currency}
              <br />
              <b>Offer Amount: </b>
              {offer.remit_amount}
              <br />
              <b>Offer Expiry: </b>
              {offer.expiration_date}
              <br />
              <b>Exchange Rate: </b>
              {offer.exchange_rate}
            </Card.Text>
            <Button variant="primary" onClick={() => this.submitHandler(offer)} className="mr-3">
              Accept
            </Button>
            {offer.allow_counter_offer == 1 &&
              <Button variant="outline-primary" onClick={() => this.makeCounterOffer(offer)}>
                Make Counter Offer</Button>}
          </Card.Body>
        </Card>
        <br />
      </div>
    ));
    let splitOffers;
    if (this.state.switch) {
      splitOffers = this.state.splitOffers.map((offer, index) => (
        <div>
          <Card border="primary" style={{ width: "40rem" }}>
            <Card.Body>
              <Card.Title>Split Offer</Card.Title>

              <Card.Text>
                <div style={{ paddingLeft: 10 }}>
                  <CardDeck>
                    <Row className="mt-3 mb-5">
                      <Card border="primary" style={{ width: "18rem" }}>
                        <Card.Header>
                          <b>{offer.offers[0].nickname}'s Offer</b>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <b>Offer Currency: </b>
                            {offer.offers[0].source_currency}
                            <br />
                            <b>Offer Amount: </b>
                            {offer.offers[0].remit_amount}
                            <br />
                            <b>Offer Expiry: </b>
                            {offer.offers[0].expiration_date}
                            <br />
                            <b>Exchange Rate: </b>
                            {offer.offers[0].exchange_rate}
                          </Card.Text>
                        </Card.Body>
                        {this.checkSplitRemitAmount(offer.offers[0], offer.offers[1], 1) == true &&
                          <Card.Footer><Button variant="outline-primary" onClick={() => this.makeCounterOffer(offer.offers[0])}>
                            Make Counter Offer
                          </Button></Card.Footer>}
                      </Card>

                      <Card border="primary" style={{ width: "18rem" }}>
                        <Card.Header>
                          <b>{offer.offers[1].nickname}'s Offer</b>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <b>Offer Currency: </b>
                            {offer.offers[1].source_currency}
                            <br />
                            <b>Offer Amount: </b>
                            {offer.offers[1].remit_amount}
                            <br />
                            <b>Offer Expiry: </b>
                            {offer.offers[1].expiration_date}
                            <br />
                            <b>Exchange Rate: </b>
                            {offer.offers[1].exchange_rate}
                          </Card.Text>
                        </Card.Body>
                        {this.checkSplitRemitAmount(offer.offers[1], offer.offers[0]) == true &&
                          <Card.Footer><Button variant="outline-primary" onClick={() => this.makeCounterOffer(offer.offers[1])}>
                            Make Counter Offer
                            </Button></Card.Footer>}
                      </Card>
                    </Row>
                  </CardDeck>
                </div>
              </Card.Text>
              <Button
                variant="primary"
                onClick={() =>
                  this.submitHandler(offer.offers[0], offer.offers[1])
                }
              >
                Accept
              </Button>
            </Card.Body>
          </Card>
          <br />
        </div>
      ));
    } else {
      splitOffers = [];
    }

    return (
      <div style={{ paddingTop: 10 }}>
        {this.state.showSuccess == true && (
          <Alert
            variant="success"
            onLoad={setTimeout(() => this.setState({ showSuccess: false }), 3000)}
            onClose={() => this.setState({ showSuccess: false })}
            dismissible
          >
            Offer Accepted
          </Alert>
        )}
        <Container className="m-5 d-flex justify-content-center">
          <Form>
            <Form.Check
              onChange={this.onSwitchAction}
              type="switch"
              id="custom-switch"
              label="Show Split Offer"
              checked={this.state.switch}
            />

            <Row className="mt-3 mb-5">
              <Col xs={singleOffers.length > 2 ? 2 : 8}
                md={singleOffers.length > 2 ? 4 : 10}
                lg={singleOffers.length > 2 ? 6 : 12} className="mt-3">
                {singleOffers}
                <br />
                {splitOffers}
              </Col>
            </Row>
          </Form>
        </Container>
        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
          <Modal.Header>
            <Modal.Title>Remit amount does not match </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your current offer is {this.state.remit_amount}.
            Would you like to change your offer to {
              this.state.new_remit_amount
            }?
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ show: false });
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                this.AcceptOffer(this.state.offerId2, this.state.offerId3)
              }
            >
              Proceed
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AutoMatch;
