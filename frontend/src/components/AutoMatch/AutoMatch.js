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
      offerId2: "",
      offerId3: "",
      show: false,
      new_remit_amount: 0,
    };
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.offerId) {
      this.setState({
        offerId: this.props.location.state.offerId,
        remit_amount: this.props.location.state.remit_amount,
      });
      this.getMatchingOffers();
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
      .catch((err) => {});
  };
  getMatchingOffers = () => {
    let paramsSingle = new URLSearchParams();
    paramsSingle.set("id", this.state.offerId);

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
      .catch((err) => {});

    let paramsSplit = new URLSearchParams();
    paramsSplit.set("id", this.state.offerId);

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
      .catch((err) => {});
  };

  onSwitchAction = () => {
    let switchValue = !this.state.switch;
    this.setState({ switch: switchValue });
  };

  submitHandler = (offerId2, offerId3 = 0) => {
    /*
    console.log("hmok");
    console.log(offerId2.remit_amount);
    console.log(offerId3.remit_amount);
    console.log(this.state.remit_amount);
    console.log(
      (offerId2.remit_amount + offerId3.remit_amount) / offerId2.exchange_rate
    );
    */
    var matching_offer =
      (offerId2.remit_amount + (offerId3 === 0 ? 0 : offerId3.remit_amount)) *
      offerId2.exchange_rate;

    if (matching_offer != this.state.remit_amount) {
      console.log(matching_offer);
      console.log(this.state.remit_amount);
      this.setState({
        show: true,
        offerId2: offerId2,
        offerId3: offerId3,
        new_remit_amount: matching_offer,
      });
    } else {
      this.AcceptOffer(offerId2.id, offerId3.id);
    }
  };

  AcceptOffer = (offerId2, offerId3) => {
    this.setState({ show: false });
    let paramAccept = new URLSearchParams();
    paramAccept.set("offerId1", this.state.offerId);
    paramAccept.set("offerId2", offerId2);
    if (offerId3 !== undefined) {
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
          if (res.data) {
            console.log(res.data);
            this.setState({ splitOffers: res.data });
          }
        }
      })
      .catch((err) => {});
  };

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
        <Card border="primary" style={{ width: "18rem" }}>
          <Card.Header>
            <b>{offer.nickname}'s Offer</b>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <b>Offer Amount: </b>
              {offer.remit_amount}
              <br />
              <b>Offer Expiry: </b>
              {offer.expiration_date}
              <br />
              <b>Exchange Rate: </b>
              {offer.exchange_rate}
            </Card.Text>
            <Button variant="primary" onClick={() => this.submitHandler(offer)}>
              Accept
            </Button>
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
                      </Card>

                      <Card border="primary" style={{ width: "18rem" }}>
                        <Card.Header>
                          <b>{offer.offers[1].nickname}'s Offer</b>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
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
      splitOffers = "";
    }

    return (
      <div style={{ paddingTop: 10 }}>
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
              <Col xs={2} md={4} lg={6} className="mt-3">
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
            Your current offer is {this.state.remit_amount}
            would you like to change your offer to {
              this.state.new_remit_amount
            }{" "}
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
            <Button variant="primary" onClick={this.AcceptOffer}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AutoMatch;
