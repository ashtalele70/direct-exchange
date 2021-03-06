import React, { useEffect, useState } from "react";
import { getMyOffers } from "./myOffersService";
import {
  Card,
  CardDeck,
  Container,
  Row,
  Col,
  Button,
  Badge, Alert,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OFFER_STATUS, OFFER_STATUS_COLOR } from "../../constants/offerStatus";

export function MyOffersComponent({ history }) {
  const [offers, setOffers] = useState([]);
  let offerList = [];

  useEffect(() => {
    async function fetchData() {
      const response = await getMyOffers({
        id: localStorage.getItem("userId"),
      });
      setOffers(response);
    }
    fetchData();
  }, []);

  if (offers) {
    offerList = Object.keys(offers).map((key) => (
      <Col
        xs={offers.length > 2 ? 2 : 8}
        md={offers.length > 2 ? 4 : 10}
        lg={offers.length > 2 ? 6 : 12}
        className="mt-3"
      >
        <Card bg="light" border="secondary" className="mt-2">
          <Card.Body>
            <Card.Title className="text-center">
              OFFER {Number(key) + 1}
            </Card.Title>
            <Card.Subtitle className="text-center">
              {offers[key].offer_status == 1
              && <Button
                  variant="outline-primary"
                  onClick={() =>
                      history.push({
                        pathname: "/postoffer",
                        state: { offer: offers[key] },
                      })
                  }
              >
                Edit offer
              </Button>}
            </Card.Subtitle>
            <Card.Text>
              <Badge variant={OFFER_STATUS_COLOR[offers[key].offer_status]}>
                {OFFER_STATUS[offers[key].offer_status]}
              </Badge>
            </Card.Text>
            <Card.Text className="float-right">
              <span className="font-weight-bold">
                Rating:{" "}
                {offers[key].rating == "0" ? "N/A" : <ReactStars
                  count={5}
                  value={
                    offers[key].rating }
                  size={24}
                  isHalf={true}
                  emptyIcon={<FontAwesomeIcon icon={faStar} />}
                  halfIcon={<FontAwesomeIcon icon={faStarHalf} />}
                  fullIcon={<FontAwesomeIcon icon={faStar} />}
                  edit={false}
                  activeColor="#ffd700"
                />}
              </span>
            </Card.Text>
            <Card.Text id="srcCountry">
              <span className="font-weight-bold">Source Country:</span>{" "}
              {offers[key].source_country}
            </Card.Text>
            <Card.Text id="srcCurrency">
              <span className="font-weight-bold">Source Currency:</span>{" "}
              {offers[key].source_currency}
            </Card.Text>
            <Card.Text id="destCountry">
              <span className="font-weight-bold">Destination Country:</span>{" "}
              {offers[key].destination_country}
            </Card.Text>
            <Card.Text id="destCurrency">
              <span className="font-weight-bold">Destination Currency:</span>{" "}
              {offers[key].destination_currency}
            </Card.Text>
            <Card.Text id="remitAmount">
              <span className="font-weight-bold">Remit Amount:</span>{" "}
              {offers[key].remit_amount}
            </Card.Text>
            <Card.Text id="exchangeRate">
              <span className="font-weight-bold">Exchange Rate:</span>{" "}
              {offers[key].exchange_rate}
            </Card.Text>
            <Card.Text id="expiryDate">
              <span className="font-weight-bold">Expiration Date:</span>{" "}
              {offers[key].expiration_date}
            </Card.Text>
          </Card.Body>
          {offers[key].offer_status == 1 && (
            <Card.Footer>
              {offers[key].allow_counter_offer == 1 &&
              <Button
                variant="outline-primary"
                onClick={() =>
                  history.push({
                    pathname: "/MycounterOffer",
                    state: { offerId: offers[key].id },
                  })
                }
              >
                Show Counter Offers
              </Button>}
              <Button
                variant="outline-primary"
                className="ml-5"
                onClick={() =>
                  history.push({
                    pathname: "/autoMatch",
                    state: {
                      offer: offers[key],
                      remit_amount: offers[key].remit_amount,
                      exchange_rate: offers[key].exchange_rate,
                    },
                  })
                }
              >
                Show Matching Offers
              </Button>
            </Card.Footer>
          )}
        </Card>
      </Col>
    ));
  }

  return (
    <Container>
      <h1 className="mt-3 text-center">My Offers</h1>
      {offerList && offerList.length == 0 && (
          <Alert className="mt-5" variant="danger">
            You have not created any offers
          </Alert>
      )}
      <CardDeck>
        <Row className="mt-3 mb-5">{offerList}</Row>
      </CardDeck>
    </Container>
  );
}
