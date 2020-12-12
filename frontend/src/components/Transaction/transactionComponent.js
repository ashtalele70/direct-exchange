import React, { useEffect, useState } from "react";
import {
  Card,
  CardDeck,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
  Modal,
  Alert,
} from "react-bootstrap";
import { getAcceptedOffers, postTransaction } from "./transactionService";

export function TransactionComponent() {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [success, setSuccess] = useState(false);
  let transactionList = [];

  async function fetchData() {
    const response = await getAcceptedOffers({
      user_id: localStorage.getItem("userId"),
    });
    setTransactions(response.filter(offer => offer.accepted_offer_status == "0"));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [show, setShow] = useState(false);

  const onSubmitHandler = async () => {
    let request = {
      match_uuid: transaction.match_uuid,
      offer_id: transaction.offer_id,
      user_id: transaction.user_id,
      remit_amount: transaction.remit_amount,
      source_currency: transaction.source_currency,
      destination_currency: transaction.destination_currency,
      transaction_status: 1,
    //   source_bank_id: 1,
    //   destination_bank_id: 2,
      service_fee: transaction.service_fee,
    };
    const response = await postTransaction(request);
    if (response == "Success") {
        fetchData();
        setSuccess(true);
    }
    console.log(request);
    setShow(false);
  };

  if (transactions) {
    transactionList = Object.keys(transactions).map((key) => (
      <Col
        xs={transactions.length > 2 ? 2 : 8}
        md={transactions.length > 2 ? 4 : 10}
        lg={transactions.length > 2 ? 6 : 12}
        className="mt-3"
      >
        <Card bg="light" border="secondary" className="mt-2">
          <Card.Body>
            <Card.Title className="text-center">
              TRANSACTION {Number(key) + 1}
            </Card.Title>
            <Card.Text id="remitAmount">
              <span className="font-weight-bold">Remit Amount:</span>{" "}
              {transactions[key].remit_amount}
            </Card.Text>
            <Card.Text id="currency">
              <span className="font-weight-bold">Currency:</span>{" "}
              {transactions[key].offer.source_currency}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-primary"
              onClick={(e, transaction) => {
                setTransaction(transactions[key]);
                setShow(true);
              }}
            >
              Pay Now
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    ));
  }

  return (
    <Container>
      {success == true && <Alert
          variant="success"
          onLoad={setTimeout(() =>  setSuccess(false) , 3000)}
          onClose={() => setSuccess(false)}
          dismissible
      > Transaction Posted Successfully</Alert>}
      <CardDeck>
        <Row className="mt-3 mb-5">{transactionList}</Row>
      </CardDeck>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Review Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupRemitAmt">
              <Form.Label>Remit Amount</Form.Label>
              <FormControl
                value={transaction.remit_amount}
                aria-label="Amount (to the nearest currency)"
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formGroupCurrency">
              <Form.Label>Currency</Form.Label>
              <FormControl
                value={
                  transaction &&
                  transaction.offer &&
                  transaction.offer.source_currency
                }
                aria-label="Currency"
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formGroupServiceFee">
              <Form.Label>Service Fee</Form.Label>
              <FormControl
                value={transaction.service_fee}
                aria-label="Service Fee"
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmitHandler}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
