import { useEffect, useState } from 'react';
import { Card, CardDeck, Container, Row, Col, Button } from 'react-bootstrap';
import { getAllTransactions, postTransaction } from './transactionService';

export function TransactionComponent() {
    const [transactions, setTransactions] = useState([]);
    let transactionList = [];

    useEffect(() => {
        async function fetchData() {
            const response = await getAllTransactions({"user_id": localStorage.getItem("userId")});
            setTransactions(response);
        }
        fetchData();
    }, []);

    const onSubmitHandler = async (e, transaction) => {
        const response = await postTransaction(transaction);
    }

    if (transactions) {
        transactionList = Object.keys(transactions).map(key =>
            <Col xs={transactions.length > 2 ? 2 : 8} md={transactions.length > 2 ? 4 : 10} lg={transactions.length > 2 ? 6 : 12} className="mt-3">
                <Card bg="light" border="secondary" className="mt-2">
                    <Card.Body>
                        <Card.Title className="text-center">TRANSACTION {Number(key) + 1}</Card.Title>
                        {/* <Card.Text id="offerId">
                            <span className="font-weight-bold">Offer Id:</span> {offers[key].source_country}
                        </Card.Text> */}
                        <Card.Text id="remitAmount">
                            <span className="font-weight-bold">Remit Amount:</span> {transactions[key].remit_amount}
                        </Card.Text>
                        <Card.Text id="currency">
                            <span className="font-weight-bold">Currency:</span> {transactions[key].transaction_currency}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="outline-primary" className="ml-5" onClick={(e, transaction) => onSubmitHandler(e, transactions[key])}>Pay Now</Button>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }

    return (
        <Container>
            <CardDeck>
                <Row className="mt-3 mb-5">
                    {transactionList}
                </Row>
            </CardDeck>
        </Container>
    )
}
