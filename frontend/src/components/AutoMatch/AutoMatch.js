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
} from "react-bootstrap";
import axios from "axios";

class AutoMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleOffers: [],
      splitOffers: [],
      user: "",
      switch: true,
      offerId2: "",
      offerId3: "",
      show: true,
    };
  }

  componentDidMount() {
    this.getMatchingOffers();
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
    paramsSingle.set("id", 13);

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
    paramsSplit.set("id", 13);

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

  submitHandler = (offerId2, offerId3) => {
    this.setState({ show: true, offerId2: offerId2, offerId3: offerId3 });
  };

  AcceptOffer = (offerId2, offerId3) => {
    let paramAccept = new URLSearchParams();
    paramAccept.set("offerId1", 45);
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
            <Button variant="primary" onClick={() => this.AcceptOffer(offer)}>
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
                  this.AcceptOffer(offer.offers[0], offer.offers[1])
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
          <Modal.Body>change remit amount to</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Update and proceed
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AutoMatch;
