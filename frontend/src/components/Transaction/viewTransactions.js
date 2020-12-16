import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import {Badge, Modal, ModalBody} from "react-bootstrap";
import {
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_COLOR,
} from "../../constants/offerStatus";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
class ViewTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      showMessageModel: false,
      currentMessenger: "",
      nickname: "",
      message: ""
    };
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

  handleShowMessageModal = (e, username) => {
    this.setState({showMessageModel: true, currentMessenger: e.username, nickname: e.nickname});
  }

  handleCloseShowMessageModal = () => {
    this.setState({showMessageModel: false, currentMessenger: "", nickname: ""});
  }

  submitMessageHandler = (event) => {
      event.preventDefault();
      var params = new URLSearchParams();
      params.set("username", this.state.currentMessenger);
      var data = {
          message: this.state.message,
          username: this.state.currentMessenger
      }
      axios
          .post(process.env.REACT_APP_ROOT_URL + "/sendMessage", data, {
              // "headers": {
              //
              //     "content-type": "application/json",
              //
              // }
          })
          .then((res) => {
              this.setState({showMessageModel: false, currentMessenger: "", nickname: ""});
          })
          .catch((err) => {});
  }

  messageChange = (event) => {
      this.setState({message: event.target.value});
  }
  render() {
    // const transactions = this.state.transactions.map((transaction, index) => (
      const transactions =  Object.keys(this.state.transactions).map(key => (
      <tr>
        <td>{this.state.transactions[key].offer_id}</td>
        <td>{this.state.transactions[key].remit_amount}</td>
        <td>{this.state.transactions[key].source_currency}</td>
        <td>{this.state.transactions[key].destination_currency}</td>
        <td>
          <Badge
            variant={TRANSACTION_STATUS_COLOR[this.state.transactions[key].transaction_status]}
          >
            {TRANSACTION_STATUS[this.state.transactions[key].transaction_status]}
          </Badge>
        </td>
        <td>
          {this.state.transactions[key].listOfOtherParties.length > 0  && <Button className="ml-1" variant="outline-primary"
                                                                 onClick={() => this.handleShowMessageModal(this.state.transactions[key].listOfOtherParties[0])}>
            Send Message to {this.state.transactions[key].listOfOtherParties[0].nickname}</Button>}
          {this.state.transactions[key].listOfOtherParties.length > 1 && <Button  className="ml-1" variant="outline-primary"
                                                                onClick={() => this.handleShowMessageModal(this.state.transactions[key].listOfOtherParties[1])}>
            Send Message to {this.state.transactions[key].listOfOtherParties[1].nickname} </Button>}
       </td>

      </tr>
    ));
    return (
      <Container className="m-5 d-flex justify-content-center">
          <h1>Your Transactions</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Offer ID</th>
              <th>Remit Amount</th>
              <th>Source Currency</th>
              <th>Destination Currency</th>
              <th>Transaction Status</th>
              <th>Send Message</th>
            </tr>
          </thead>
          <tbody>{transactions}</tbody>
        </Table>
        <Modal show={this.state.showMessageModel} onHide={this.handleCloseShowMessageModal}>
          <Modal.Header closeButton>
            <Modal.Title>Send Message to {this.state.nickname}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.submitMessageHandler}>
                    <Form.Group controlId="message">
                        <Form.Label>Email Text</Form.Label>
                        <Form.Control as="textarea" rows={5} onChange={this.messageChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Send Message
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

export default ViewTransactions;
