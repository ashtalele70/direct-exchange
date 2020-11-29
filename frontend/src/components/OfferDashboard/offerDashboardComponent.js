
import { useEffect, useState } from 'react';
import { getAllOffers } from './offerDashboardService';
import { Card, CardDeck, Container, Row, Col, Modal, Button, Dropdown, FormControl, Pagination, Form } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function OfferDashboardComponent() {
    const [offers, setOffers] = useState([]);
    const [allOffers, setAllOffers] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [active, setActivePage] = useState(1);
    let offerList = [];
    let itemsPerPage = 10;
    let items = [];

    useEffect(() => {
        async function fetchData() {
            const response = await getAllOffers();
            setOffers(response);
            setAllOffers(response);
        }
        fetchData();
    }, []);

    // const onRatingChangeHandler = (newRating) => {
    //     console.log(newRating);
    // };

    const [show, setShow] = useState(false);
    //const [showOfferDetailModal, setShowOfferDetailModel] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleCloseOfferDetailModal = () => setShowOfferDetailModel(false);
    // const handleShowOfferDetailModal = () => setShowOfferDetailModel(true);

    const getOfferList = () => {
        let list = [];
        if((srcCurrency == "" && destCurrency == "" && srcAmount == 0 && destAmount == 0) || offers.length == 0) {
            allOffers.forEach(obj => list.push(obj));
        } else {
            offers.forEach(obj => list.push(obj));
        }
        return list;
    }

    const [srcCurrency, setSrcCurrency] = useState("");
    const handleSrcCurrencyChange = (e) => {
        setSrcCurrency(e);
        setOffers(allOffers.filter(offer => {
            return offer.source_currency == e;
        }));
    }

    const [destCurrency, setDestCurrency] = useState("");
    const handleDestCurrencyChange = (e) => {
        setDestCurrency(e);
        setOffers(allOffers.filter(offer => {
            return offer.destination_currency == e;
        }));
    }

    const [srcAmount, setSrcAmount] = useState(0);
    const handleSrcAmountChange = (e) => {
        setSrcAmount(Number(e.target.value));
        setOffers(allOffers.filter(offer => {
            return offer.remit_amount == Number(e.target.value);
        }));
    }

    const [destAmount, setDestAmount] = useState(0);
    const handleDestAmountChange = (e) => {
        setDestAmount(Number(e.target.value));
        setOffers(allOffers.filter(offer => {
            return (offer.remit_amount) * (offer.exchange_rate) == Number(e.target.value);
        }));
    }

    const handleClear = () => {
        setSrcCurrency("");
        setDestCurrency("");
        setSrcAmount(0);
        setDestAmount(0);
        setOffers(allOffers);
    }

    const pageOnClickHandler = (e) => {
        let page = Number(e.target.innerText[0]);
        setStartIndex((page-1)*10);
        setActivePage(page);
    }

    if (offers) {
        let pageCount = (offers.length / itemsPerPage) + 1;
        for (let number = 1; number <= pageCount; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                {number}
                </Pagination.Item>,
            );
        }

        offerList = Object.keys(offers).map(key =>
            <Col xs={2} md={4} lg={6} className="mt-3">
                <Card bg="light" border="secondary" className="mt-2">
                    <Card.Body>
                        <Card.Title className="text-center">OFFER {Number(key) + 1}</Card.Title>
                        <Card.Text className="float-right">
                            <span className="font-weight-bold">Rating: <ReactStars
                                count={5}
                                value={offers[key].ratings && offers[key].ratings.length > 0 ? offers[key].ratings[0].avgRating : 0}
                                // onChange={onRatingChangeHandler}
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
        
        offerList = ((startIndex+10) < offerList.length) ? offerList.slice(startIndex, startIndex+10) : offerList.slice(startIndex);
    }

    return (
        <Container>
            <Button variant="primary" onClick={handleShow} className="mt-5 float-right">
                Filter Results
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter By</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={5}>
                            <Form>
                                <Form.Group controlId="formGroupSrcCurrency">
                                    <Form.Label>Source Currency</Form.Label>
                                    <Dropdown id="dropdown-basic-button" onSelect={(e) => handleSrcCurrencyChange(e)}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {srcCurrency ? srcCurrency : "Please Select"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                                            <Dropdown.Item eventKey="INR">INR</Dropdown.Item>
                                            <Dropdown.Item eventKey="RMB">RMB</Dropdown.Item>
                                            <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
                                            <Dropdown.Item eventKey="GBP">GBP</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                                <Form.Group controlId="formGroupDestCurrency">
                                    <Form.Label>Destination Currency</Form.Label>
                                    <Dropdown id="dropdown-basic-button" onSelect={(e) => handleDestCurrencyChange(e)}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {destCurrency ? destCurrency : "Please Select"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                                            <Dropdown.Item eventKey="INR">INR</Dropdown.Item>
                                            <Dropdown.Item eventKey="RMB">RMB</Dropdown.Item>
                                            <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
                                            <Dropdown.Item eventKey="GBP">GBP</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col md={7}>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Source Currency Amount</Form.Label>
                                    <FormControl defaultValue={srcAmount} aria-label="Amount (to the nearest dollar)" onChange={(e) => handleSrcAmountChange(e)} />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Destination Currency Amount</Form.Label>
                                    <FormControl defaultValue={destAmount} aria-label="Amount (to the nearest dollar)" onChange={(e) => handleDestAmountChange(e)} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClear}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <Modal show={show} onHide={handleCloseOfferDetailModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter By</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={5}>
                            <Form>
                                <Form.Group controlId="formGroupSrcCurrency">
                                    <Form.Label>Source Currency</Form.Label>
                                    <Dropdown id="dropdown-basic-button" onSelect={(e) => handleSrcCurrencyChange(e)}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {srcCurrency ? srcCurrency : "Please Select"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                                            <Dropdown.Item eventKey="INR">INR</Dropdown.Item>
                                            <Dropdown.Item eventKey="RMB">RMB</Dropdown.Item>
                                            <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
                                            <Dropdown.Item eventKey="GBP">GBP</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                                <Form.Group controlId="formGroupDestCurrency">
                                    <Form.Label>Destination Currency</Form.Label>
                                    <Dropdown id="dropdown-basic-button" onSelect={(e) => handleDestCurrencyChange(e)}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {destCurrency ? destCurrency : "Please Select"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                                            <Dropdown.Item eventKey="INR">INR</Dropdown.Item>
                                            <Dropdown.Item eventKey="RMB">RMB</Dropdown.Item>
                                            <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
                                            <Dropdown.Item eventKey="GBP">GBP</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col md={7}>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Source Currency Amount</Form.Label>
                                    <FormControl defaultValue={srcAmount} aria-label="Amount (to the nearest dollar)" onChange={(e) => handleSrcAmountChange(e)} />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Destination Currency Amount</Form.Label>
                                    <FormControl defaultValue={destAmount} aria-label="Amount (to the nearest dollar)" onChange={(e) => handleDestAmountChange(e)} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClear}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> */}
            <CardDeck>
                <Row className="mt-3 mb-5">
                    {offerList}
                </Row>
            </CardDeck>
            <Pagination className="float-right" onClick = {(e) => pageOnClickHandler(e)}>{items}</Pagination>
        </Container>
    )
}
