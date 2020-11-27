
import { useEffect, useState } from 'react';
import { getAllOffers } from './offerDashboardService';
import { Card, CardDeck, Container, Row, Col } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function OfferDashboardComponent() {
    const [offers, setOffers] = useState([]);
    let offerList = [];

    useEffect(() => {
        async function fetchData() {
            const response = await getAllOffers();
            setOffers(response);
        }
        fetchData();
    }, []);

    const onRatingChangeHandler = (newRating) => {
        console.log(newRating);
      };

    if (offers) {
        offerList = Object.keys(offers).map(key =>

            <Col xs={2} md={4} lg={6} className="mt-3">
                <Card bg="light" border="secondary" className="mt-2">
                    <Card.Body>
                        <Card.Title className="text-center">OFFER {Number(key) + 1}</Card.Title>
                        <Card.Text className = "float-right">
                            <span className="font-weight-bold">Rating: <ReactStars
                                count={5}
                                value={offers[key].ratings.length > 0 ? offers[key].ratings[0].avgRating : 0}
                                onChange={onRatingChangeHandler}
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
                            <span className="font-weight-bold">Source Country:</span> {offers[key].source_country}
                        </Card.Text>
                        <Card.Text id="srcCurrency">
                            <span className="font-weight-bold">Source Currency:</span> {offers[key].source_currency}
                        </Card.Text>
                        <Card.Text id="destCountry">
                            <span className="font-weight-bold">Destination Country:</span> {offers[key].destination_country}
                        </Card.Text>
                        <Card.Text id="destCurrency">
                            <span className="font-weight-bold">Destination Currency:</span> {offers[key].destination_currency}
                        </Card.Text>
                        <Card.Text id="remitAmount">
                            <span className="font-weight-bold">Remit Amount:</span> {offers[key].remit_amount}
                        </Card.Text>
                        <Card.Text id="exchangeRate">
                            <span className="font-weight-bold">Exchange Rate:</span> {offers[key].exchange_rate}
                        </Card.Text>
                        <Card.Text id="expiryDate">
                            <span className="font-weight-bold">Expiration Date:</span> {offers[key].expiration_date}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Link href="/">View Offer Details</Card.Link>
                    </Card.Footer>
                </Card>
            </Col>

        );
    }

    return (
        <Container>
            <CardDeck>
                <Row className="mt-3 mb-5">
                    {offerList}
                </Row>
            </CardDeck>
        </Container>
    )
}
