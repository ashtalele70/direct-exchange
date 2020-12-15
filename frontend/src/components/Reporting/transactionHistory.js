import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [], totals: [] };
  }

  componentDidMount() {
    this.getTransactionHistory();
    this.getTotals();
  }

  getTotals = () => {
    let params = new URLSearchParams();
    params.set("user_id", localStorage.getItem("userId"));
    axios
      .get(
        process.env.REACT_APP_ROOT_URL +
          "/totaltransactions?" +
          params.toString()
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            console.log(new Date());
            this.setState({ totals: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  getTransactionHistory = () => {
    let params = new URLSearchParams();
    params.set("user_id", localStorage.getItem("userId"));
    axios
      .get(
        process.env.REACT_APP_ROOT_URL +
          "/historytransactions?" +
          params.toString()
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            console.log(new Date());
            this.setState({ transactions: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  /*
   * 0:match_uuid
   * 1:user_id
   * 2:offer_id
   * 3:source_currency
   * 4:source_amount
   * 5:exchange_rate
   * 6:destination_currency
   * 7:destination_amount
   * 8:service fee
   * 9:transaction date
   */

  render() {
    const transactions = this.state.transactions.map((transaction, index) => (
      <tr>
        <td>{index + 1}</td>
        <td>{transaction[9]}</td>
        <td>{transaction[3]}</td>
        <td>{transaction[4]}</td>
        <td>{transaction[5]}</td>
        <td>{transaction[6]}</td>
        <td>{transaction[7]}</td>
        <td>{transaction[8]}</td>
      </tr>
    ));

    return (
      <Container className="m-5 d-flex justify-content-center">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th></th>
              <th>Transaction Date</th>
              <th>Source Currency</th>
              <th>Source Amount</th>
              <th>Exchange Rate</th>
              <th>Destination Currency</th>
              <th>Destination Amount</th>
              <th>Service Fee</th>
            </tr>
          </thead>
          <tbody>{transactions}</tbody>
          <tr>
            <td colspan="2">Total source amount in USD</td>
            <td>
              <b>{this.state.totals[0]}$</b>
            </td>
          </tr>
          <tr>
            <td colspan="2">Total destination amount in USD</td>
            <td>
              <b>{this.state.totals[1]}$</b>
            </td>
          </tr>
          <tr>
            <td colspan="2">Total Service fee in USD</td>
            <td>
              <b>{this.state.totals[2]}$</b>
            </td>
          </tr>
        </Table>
      </Container>
    );
  }
}

export default TransactionHistory;
