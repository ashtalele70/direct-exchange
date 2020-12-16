
import React, { useEffect, useState } from 'react';
import { getAllOffers, getFilteredOffers } from './offerDashboardService';
import {
    Card,
    CardDeck,
    Container,
    Row,
    Col,
    Modal,
    Button,
    Dropdown,
    FormControl,
    Pagination,
    Form,
    Table,
    Badge,
    Alert
} from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllTransactions } from './offerDashboardService';
import {
    TRANSACTION_STATUS,
    TRANSACTION_STATUS_COLOR,
  } from "../../constants/offerStatus";

export function OfferDashboardComponent() {
    const [offers, setOffers] = useState([]);
    const [allOffers, setAllOffers] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [active, setActivePage] = useState(1);
    const [currentOffer, setCurrentOffer] = useState({});
    const [transactions, setTransactions] = useState([]);
    let offerList = [];
    let itemsPerPage = 10;
    let items = [];
    let reviews = [];
    let filterCriteria = {};
    let transactionHistory = [];

    useEffect(() => {
        async function fetchData() {
            const response = await getAllOffers({ "id": localStorage.getItem("userId") });
            setOffers(response);
            setAllOffers(response);
        }
        fetchData();
    }, []);

    const [show, setShow] = useState(false);
    const [showOfferDetailModal, setShowOfferDetailModal] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseHistoryModal = () => {
        setShowHistoryModal(false);
        setOfferDetailClicked(false);
        if(offerDetailClicked) setShowOfferDetailModal(true);
    }

    const handleCloseOfferDetailModal = () => setShowOfferDetailModal(false);

    const handleShowOfferDetailModal = (offer) => {
        setShowOfferDetailModal(true);
        let fullOffer = JSON.parse(JSON.stringify(offer));
        setCurrentOffer(fullOffer);
    }

    const [srcCurrency, setSrcCurrency] = useState("");
    const handleSrcCurrencyChange = async (e) => {
        setSrcCurrency(e);
        filterCriteria["sourceCurrency"] = e;
        filterCriteria["id"] = localStorage.getItem("userId");
        const response = await getFilteredOffers(filterCriteria);
        setOffers(response);
    }

    const [destCurrency, setDestCurrency] = useState("");
    const handleDestCurrencyChange = async (e) => {
        setDestCurrency(e);
        filterCriteria["destinationCurrency"] = e;
        filterCriteria["id"] = localStorage.getItem("userId");
        const response = await getFilteredOffers(filterCriteria);
        setOffers(response);
    }

    const [srcAmount, setSrcAmount] = useState(0);
    const handleSrcAmountChange = async (e) => {
        setSrcAmount(Number(e.target.value));
        filterCriteria["sourceAmount"] = Number(e.target.value);
        filterCriteria["id"] = localStorage.getItem("userId");
        const response = await getFilteredOffers(filterCriteria);
        setOffers(response);
    }

    const [destAmount, setDestAmount] = useState(0);
    const handleDestAmountChange = async (e) => {
        setDestAmount(Number(e.target.value));
        filterCriteria["destinationAmount"] = Number(e.target.value);
        filterCriteria["id"] = localStorage.getItem("userId");
        const response = await getFilteredOffers(filterCriteria);
        setOffers(response);
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
        setStartIndex((page - 1) * 10);
        setActivePage(page);
    }

    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [offerDetailClicked, setOfferDetailClicked] = useState(false);
    const showTransactionHistory = async (userId, isOfferDetailClicked = false) => {
        const response = await getAllTransactions({ "user_id": userId });
        setTransactions(response);
        if(isOfferDetailClicked) {
            setShowOfferDetailModal(false);
            setOfferDetailClicked(true);
        }
        setShowHistoryModal(true);
    }

    if (offers) {
        let pageCount = ((offers.length - 1) / itemsPerPage) + 1;
        for (let number = 1; number <= pageCount; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }

        offerList = Object.keys(offers).map(key =>
            <Col xs={offers.length > 2 ? 2 : 8} md={offers.length > 2 ? 4 : 10} lg={offers.length > 2 ? 6 : 12} className="mt-3">
                <Card bg="light" border="secondary" className="mt-2">
                    <Card.Body>
                        <Card.Title className="text-center">OFFER {Number(key) + 1}</Card.Title>
                        <Card.Text id="nickname">
                            <span className="font-weight-bold">Posted By:</span> {offers[key].nickname}
                        </Card.Text>
                        <Card.Text className="float-right" onClick={() => showTransactionHistory(offers[key].user_id)}>
                            <span className="font-weight-bold">Rating: {offers[key].rating == "0" ? "N/A" : <ReactStars
                                count={5}
                                value={offers[key].rating}
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
                        <Button variant="outline-primary" onClick={() => handleShowOfferDetailModal(offers[key])}>View Offer Details</Button>
                    </Card.Footer>
                </Card>
            </Col>
        );

        offerList = ((startIndex + 10) < offerList.length) ? offerList.slice(startIndex, startIndex + 10) : offerList.slice(startIndex);
    }

    if(transactions) {
        transactionHistory =  Object.keys(transactions).map(key => (
            <tr>
              <td>{transactions[key].listOfOtherParties.map(party => <abbr title={party.username}>{party.username.substring(0, 2)}{transactions[key].listOfOtherParties.length > 1 ? ", " : ""}</abbr>)}</td>
              <td>{transactions[key].offer_id}</td>
              <td>{transactions[key].remit_amount}</td>
              <td>{transactions[key].source_currency}</td>
              <td>{transactions[key].destination_currency}</td>
              <td>
                <Badge
                  variant={TRANSACTION_STATUS_COLOR[transactions[key].transaction_status]}
                >
                  {TRANSACTION_STATUS[transactions[key].transaction_status]}
                </Badge>
              </td>
      
            </tr>
        ));
    }

    return (
        <Container>

            <h1>Offer Dashboard</h1>
            {offers && offers.length == 0 && (
                <Alert className="mt-5" variant="danger">
                    No offers to show
                </Alert>
            )}
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
            <Modal show={showOfferDetailModal} onHide={handleCloseOfferDetailModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Offer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <span className="d-block"><span className="font-weight-bold text-primary">Posted By: </span>{currentOffer.email}</span>
                            <span className="mt-2 d-block"><span className="font-weight-bold text-primary">Source Country: </span>{currentOffer.source_country}</span>
                            <span className="mt-2 d-block"><span className="font-weight-bold text-primary">Source Currency: </span>{currentOffer.source_currency}</span>
                            <span className="mt-2 d-block"><span className="font-weight-bold text-primary">Destination Country: </span>{currentOffer.destination_country}</span>
                            <span className="mt-2 d-block"><span className="font-weight-bold text-primary">Destination Currency: </span>{currentOffer.destination_currency}</span>
                            <span className="mt-2 d-block"><span className="font-weight-bold text-primary">Remit Amount: </span>{currentOffer.remit_amount}</span>
                            <span className="mt-2 d-block"><span className="font-weight-bold text-primary">Exchange Rate: </span>{currentOffer.exchange_rate}</span>
                            <span className="mt-2 d-block"><span className="font-weight-bold text-primary">Expiration Date: </span>{currentOffer.expiration_date}</span>
                        </Col>
                        <Col>
                            <span className="font-weight-bold text-primary" onClick={() => showTransactionHistory(currentOffer.user_id, true)}>Rating: {currentOffer.rating == "0" ? "N/A" : <ReactStars
                                count={5}
                                value={currentOffer.rating}
                                size={24}
                                isHalf={true}
                                emptyIcon={<FontAwesomeIcon icon={faStar} />}
                                halfIcon={<FontAwesomeIcon icon={faStarHalf} />}
                                fullIcon={<FontAwesomeIcon icon={faStar} />}
                                edit={false}
                                activeColor="#ffd700"
                            />}
                            </span>
                        </Col></Row>
                </Modal.Body>
            </Modal>
            <Modal show={showHistoryModal} onHide={handleCloseHistoryModal} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Transaction History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Offer ID</th>
                                <th>Remit Amount</th>
                                <th>Source Currency</th>
                                <th>Destination Currency</th>
                                <th>Transaction Status</th>
                            </tr>
                        </thead>
                        <tbody>{transactionHistory}</tbody>
                    </Table>
                </Modal.Body>
            </Modal>
            <CardDeck>
                <Row className="mt-3 mb-5">
                    {offerList}
                </Row>
            </CardDeck>
            <Pagination className="float-right" onClick={(e) => pageOnClickHandler(e)}>{items}</Pagination>
        </Container>
    )
}

