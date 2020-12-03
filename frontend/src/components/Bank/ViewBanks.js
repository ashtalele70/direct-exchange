import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { BANK_TYPE } from "../../constants/offerStatus";

class ViewBanks extends Component {
  constructor(props) {
    super(props);
    this.state = { banks: [] };
  }

  componentDidMount() {
    this.getBanks();
  }

  deleteBank = (id) => {
    let params = new URLSearchParams();
    params.set("bank_id", id);
    axios
      .delete(
        process.env.REACT_APP_ROOT_URL + "/deleteBank?" + params.toString()
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            banks: this.state.banks.filter((bank) => bank.id != id),
          });
        }
      })
      .catch((err) => {});
  };
  getBanks = () => {
    let params = new URLSearchParams();
    params.set("user_id", localStorage.getItem("userId"));
    axios
      .get(process.env.REACT_APP_ROOT_URL + "/getbank?" + params.toString())
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            this.setState({ banks: res.data });
          }
        }
      })
      .catch((err) => {});
  };
  render() {
    const banks = this.state.banks.map((bank, index) => (
      <tr>
        <td>{bank.bank_name}</td>
        <td>{bank.country}</td>
        <td>{bank.account_number}</td>
        <td>{bank.account_holder}</td>
        <td>{bank.account_address}</td>
        <td>{bank.primary_currency}</td>
        <td>{BANK_TYPE[bank.bank_type]}</td>
        <td>
          {" "}
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => this.deleteBank(bank.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <Container className="m-5 d-flex justify-content-center">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Country</th>
              <th>Account Number</th>
              <th>Account Holder</th>
              <th>Address</th>
              <th>Currency</th>
              <th>Bank_type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{banks}</tbody>
        </Table>
      </Container>
    );
  }
}

export default ViewBanks;
