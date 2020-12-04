import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  CardDeck,
  Alert,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

class GetMyCounterOffers extends Component {
  offerId = -1;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      Offers_list: [],
      showSuccess: false,
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.offerId = this.props.location.state.offerId;

      this.getMyCounterOffers();
    }
  }

  getMyCounterOffers = () => {
    axios
      .get(
        process.env.REACT_APP_ROOT_URL + "/getAllCounterOffers/" + this.offerId
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data && res.data.length) {
            //console.log(res.data);
            this.setState({ Offers_list: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  AcceptOffer = (offerId2) => {
    console.log(offerId2);
    console.log(this.offerId);
    this.setState({ show: false });
    let paramAccept = new URLSearchParams();
    paramAccept.set("offerId1", this.offerId);
    paramAccept.set("offerId2", offerId2);

    axios
      .post(
        process.env.REACT_APP_ROOT_URL +
          "/acceptedOffer?" +
          paramAccept.toString()
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({showSuccess: true});
          if (res.data) {
            console.log(res.data);
            this.setState({ splitOffers: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  render() {
    console.log(this.state.Offers_list);
    var displayform = null;
    displayform = this.state.Offers_list.map(
      (item, i) => (
        //{
        //return (
        //<div>
        /* <div class="form-group row" paddingright>
                    <div class="col-lg-3">        </div>
                    <div class="col-lg-3"> */
        <Col
          xs={this.state.Offers_list.length > 2 ? 2 : 8}
          md={this.state.Offers_list.length > 2 ? 4 : 10}
          lg={this.state.Offers_list.length > 2 ? 6 : 12}
          className="mt-3"
        >
          <Card bg="light" border="secondary" className="mt-2">
            <Card.Body>
              <Card.Title className="text-center">OFFER {i + 1}</Card.Title>

              <Card.Text className="float-right">
                <span className="font-weight-bold">
                  Rating:{" "}
                  <ReactStars
                    count={5}
                    value={
                      item.ratings && item.ratings.length > 0
                        ? item.ratings[0].avgRating
                        : 0
                    }
                    size={24}
                    isHalf={true}
                    emptyIcon={<FontAwesomeIcon icon={faStar} />}
                    halfIcon={<FontAwesomeIcon icon={faStarHalf} />}
                    fullIcon={<FontAwesomeIcon icon={faStar} />}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </span>
              </Card.Text>
              <Card.Text id="srcCountry">
                <span className="font-weight-bold">Source Country:</span>{" "}
                {item.source_country}
              </Card.Text>
              <Card.Text id="srcCurrency">
                <span className="font-weight-bold">Source Currency:</span>{" "}
                {item.source_currency}
              </Card.Text>
              <Card.Text id="destCountry">
                <span className="font-weight-bold">Destination Country:</span>{" "}
                {item.destination_country}
              </Card.Text>
              <Card.Text id="destCurrency">
                <span className="font-weight-bold">Destination Currency:</span>{" "}
                {item.destination_currency}
              </Card.Text>
              <Card.Text id="remitAmount">
                <span className="font-weight-bold">Remit Amount:</span>{" "}
                {item.remit_amount}
              </Card.Text>
              <Card.Text id="exchangeRate">
                <span className="font-weight-bold">Exchange Rate:</span>{" "}
                {item.exchange_rate}
              </Card.Text>
              <Card.Text id="expiryDate">
                <span className="font-weight-bold">Expiration Date:</span>{" "}
                {item.expiration_date}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => this.AcceptOffer(item.id)}
              >
                Accept
              </Button>
            </Card.Body>
          </Card>
        </Col>
      )
      //</div>
      //  </div>
      //  </div>
      // )
      //}
    );
    return (
        <div>
        {this.state.showSuccess == true && (
              <Alert
                  variant="success"
                  onClose={() => this.setState({ showSuccess: false })}
                  dismissible
              >
                Offer Accepted
              </Alert>
          )}
      <Container>
        {/*
        {offerList}
    </Row> */}
        {this.state.Offers_list.length == 0 && (
          <Alert className="mt-5" variant="danger">
            No counter offers for this offer
          </Alert>
        )}
        <CardDeck>
          <Row className="mt-3 mb-5">{displayform}</Row>
        </CardDeck>
      </Container>
        </div>
    );
  }
}

export default GetMyCounterOffers;
