import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
class FinancialReport extends Component {
  display = [];
  constructor(props) {
    super(props);
    this.display = [
      "Number of Completed Transaction",
      "Number of uncompleted Trasaction",
      "Total Remit Amount (completed Transactions) ($)",
      "Total Service Fee(completed Transactions) ($)",
    ];

    this.state = { monthYear: "Choose" };
  }

  getLast12Months() {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var today = new Date();
    var month = today.getMonth();
    var last12Months = [];
    var monthInWords = "";

    for (var i = 0; i < 12; i++) {
      var newMonth = today.getMonth() - i;
      var newYear = today.getFullYear();

      monthInWords = monthNames[newMonth];
      if (newMonth < 0) {
        newYear = today.getFullYear() - 1;
        monthInWords = monthNames[12 + newMonth];
      }
      var newDate = new Date(today.getDate(), newMonth, newYear);
      last12Months.push(monthInWords + " - " + newYear);
    }
    return last12Months;
  }

  ClickHandler = (event) => {
    var input = this.state.monthYear.split("-");
    console.log(input[0]);
    console.log(input[1]);

    let params = new URLSearchParams();
    params.set("month", input[0]);
    params.set("year", input[1]);
    axios
      .get(
        process.env.REACT_APP_ROOT_URL + "/financialreport?" + params.toString()
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);

            this.setState({ report: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  render() {
    let financialReport = "";
    if (this.state.report) {
      financialReport = this.state.report.map((report, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{this.display[index]}</td>
          <td>{report}</td>
        </tr>
      ));
    }

    return (
      <Container className="m-5 d-flex justify-content-center">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter the month & Year of report </Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.monthYear}
              onChange={(event) =>
                this.setState({ monthYear: event.target.value })
              }
            >
              <option>Choose</option>
              {this.getLast12Months().map((option) => (
                <option
                  value={option}
                  disabled={option == this.state.monthYear}
                >
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={this.ClickHandler}>
            Get Report
          </Button>
        </Form>
        <Table>{financialReport}</Table>
      </Container>
    );
  }
}

export default FinancialReport;
