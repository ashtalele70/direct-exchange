import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Badge } from "react-bootstrap";
import {
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_COLOR,
} from "../../constants/offerStatus";
class ViewTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions = () => {
    let params = new URLSearchParams();
    params.set("user_id", localStorage.getItem("userId"));
    axios
      .get(
        process.env.REACT_APP_ROOT_URL + "/gettransactions?" + params.toString()
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            this.setState({ transactions: res.data });
          }
        }
      })
      .catch((err) => {});
  };
  render() {
    const transactions = this.state.transactions.map((transaction, index) => (
      <tr>
        <td>{transaction.offer_id}</td>
        <td>{transaction.remit_amount}</td>
        <td>{transaction.source_currency}</td>
        <td>{transaction.destination_currency}</td>
        <td>
          <Badge
            variant={TRANSACTION_STATUS_COLOR[transaction.transaction_status]}
          >
            {TRANSACTION_STATUS[transaction.transaction_status]}
          </Badge>
        </td>
      </tr>
    ));
    return (
      <Container className="m-5 d-flex justify-content-center">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Offer ID</th>
              <th>Remit Amount</th>
              <th>Source Currency</th>
              <th>Destination Currency</th>
              <th>Transaction Status</th>
            </tr>
          </thead>
          <tbody>{transactions}</tbody>
        </Table>
      </Container>
    );
  }
}

export default ViewTransactions;
