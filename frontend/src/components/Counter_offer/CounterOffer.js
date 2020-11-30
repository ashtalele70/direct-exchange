import React, { Component } from "react";
import {
  Col,
  Modal,
  Container,
  Button,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import axios from "axios";
import CurrencyInput from "react-currency-input";

class CounterOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      exchange_rate: "",
      expiration_date: "",
     showbank: false,
     showMon:false,
      offer_status: "Pending",
      is_counter: 0,
      rates: [],
      amount: "0.00",
      remit_amount_destination: 0,
      user_id: localStorage.getItem("userId"),
      source_bank_message: "",
      destination_bank_message: "",
      Og_offer_det: {}
    };
  }

  componentDidMount() {
    this.getRates();
    this.getOgOfferDet();
   
  }

  sourceCountryChange = () => {
 
      let params = new URLSearchParams();
      params.set("source_country", this.state.Og_offer_det.destination_country);
      params.set("source_currency", this.state.Og_offer_det.destination_currency);
      params.set("bank_type", 1);
      params.set("user_id", this.state.user_id);
      axios
        .get(
          process.env.REACT_APP_ROOT_URL + "/getuserbank?" + params.toString()
        )
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length === 0) {
              var message =
                " \n country: " +
                this.state.source_currency +
                " currency: " +
                this.state.source_country;
              this.setState({ source_bank_message: message });
            } else {
              this.setState({ source_bank_message: "" });
            }
          }
        })
        .catch((err) => {});
    
  };

 

  destinationCountryChange = (event) => {
   
      let params = new URLSearchParams();
      params.set("source_country", this.state.Og_offer_det.source_country);
      params.set("source_currency", this.state.Og_offer_det.source_currency);
      params.set("bank_type", 2);
      params.set("user_id", this.state.user_id);
      axios
        .get(
          process.env.REACT_APP_ROOT_URL + "/getuserbank?" + params.toString()
        )
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length === 0) {
              var message =
                " \n country: " +
                this.state.destination_currency +
                " currency: " +
                this.state.destination_country;
              this.setState({ destination_bank_message: message });
            } else {
              this.setState({ destination_bank_message: "" });
            }
          }
        })
        .catch((err) => {});
    
  };

  handleChange = (event, maskedvalue, floatvalue) => {
    console.log(maskedvalue * Number(this.state.exchange_rate));
    this.setState({
      amount: maskedvalue,
      remit_amount_destination: maskedvalue * this.state.exchange_rate,
    });
    this.exchageRate();
    this.sourceCountryChange();
    this. destinationCountryChange();
  };

  getOgOfferDet= () => {
    axios
      .get(process.env.REACT_APP_ROOT_URL + "/getOffer/63" )
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            this.setState({ Og_offer_det: res.data });
          }
        }
      })
      .catch((err) => {});
  };
  getInitialState() {
    return { amount: "0.00" };
  }
  hideBankModal = () => {
    this.setState({ showbank: false });
  };
 
  hideMonModal = () => {
    this.setState({ showMon: false });
  };
 
  submitHandler = (event) => {
    var values = {
      user_id: this.state.user_id,
      source_country: this.state.Og_offer_det.destination_country,
      source_currency: this.state.Og_offer_det.destination_currency,
      remit_amount: this.state.amount,
      destination_country: this.state.Og_offer_det.source_country,
      destination_currency: this.state.Og_offer_det.source_currency,
      exchange_rate: this.state.exchange_rate,
      expiration_date: this.state.expiration_date,
      allow_counter_offer: "1",
      allow_split_offer: "0",
      offer_status: "1",
      is_counter: 1,
    };
    let og_offer_user_id= this.state.Og_offer_det.user_id;
    let og_offer_id=this.state.Og_offer_det.id;
    
    let money= this.state.Og_offer_det.remit_amount;
 let myMon= this.state.remit_amount_destination;


    if ( myMon>= 0.9*money && myMon<= 1.1*money)
  {
    if (
      this.state.source_bank_message === "" &&
      this.state.destination_bank_message === ""
    )
    {
  
      axios
       .post(process.env.REACT_APP_ROOT_URL + "/counterOffer/" + og_offer_user_id+"/"+og_offer_id, values)
       .then((res) => {
          if (res.status === 200) {
           
           // this.props.history.push("/postoffer");
          }
        })
        .catch((err) => {});
    } 
    else {
      console.log("bank fail")
      event.preventDefault();
      this.setState({ showbank: true });
    }
  }
    else {
      console.log("mon fail")
      event.preventDefault();
      this.setState({ showMon: true });
    
    }
   };



  getRates = () => {
    axios
      .get(process.env.REACT_APP_ROOT_URL + "/rates")
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            this.setState({ rates: res.data });
            this.exchageRate();
          }
        }
      })
      .catch((err) => {});
  };

  exchageRate() {
    
      this.state.rates.map((gh) => {
       
        if (
          this.state.Og_offer_det.destination_currency == gh.source_currency &&
          this.state.Og_offer_det.source_currency == gh.destination_currency
        ) {
         
          this.setState({ exchange_rate: gh.rate });
          
         // return gh.rate;
        }
      });
    
  }

   
    render() {

      let a =this.state.Og_offer_det.exchange_rate;
     
      
      
 
    return (
      
      <div style={{ paddingTop: 10 }}>
        <Container className="m-5 d-flex justify-content-center">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="fromCurrency">
                <Form.Label>From (Currency) </Form.Label>
                <Form.Control
                   value={this.state.Og_offer_det.destination_currency}
                   aria-describedby="basic-addon2"
                   readOnly="true"
                  // onChange={this.exchageRate()}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="fromCountry">
                <Form.Label>From (Country) </Form.Label>
                <Form.Control
                   value={this.state.Og_offer_det.destination_country}
                   aria-describedby="basic-addon2"
                   readOnly="true"
                >
                </Form.Control>
              </Form.Group>
            </Form.Row>  
            <Form.Row>
              <Form.Group as={Col} controlId="toCurrency">
                <Form.Label>To (Currency)</Form.Label>
                <Form.Control
                   value={this.state.Og_offer_det.source_currency}
                   aria-describedby="basic-addon2"
                   readOnly="true"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="toCountry">
                <Form.Label>To (Country)</Form.Label>
                <Form.Control
                   value={this.state.Og_offer_det.source_country}
                   aria-describedby="basic-addon2"
                   readOnly="true"
                >
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="sendAmount">
                <Form.Label> Send amount &nbsp; </Form.Label>
                <CurrencyInput
                  value={this.state.amount}
                  onChangeEvent={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="echangeRate">
                <Form.Label>Exchange rate</Form.Label>
                <Form.Control
                  type="name"
                  readOnly="readOnly"
                  value={this.state.exchange_rate}
    
                />
              </Form.Group>
              <Form.Group as={Col} controlId="recieveAmount">
                <Form.Label>Recieve amount</Form.Label>
                <Form.Control
                  type="name"
                  value={this.state.remit_amount_destination}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="expiryDate">
                <Form.Label>Expiry Date for the offer</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Expiry Date for the offer"
                  onChange={(event) =>
                    this.setState({ expiration_date: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
              
            <OverlayTrigger
              overlay={<Tooltip id={`tooltip-top`}>allow</Tooltip>}
            >
              <Button
                variant="primary"
                type="submit"
                onClick={this.submitHandler}
              >
                Post Counter Offer
              </Button>
            </OverlayTrigger>
          </Form>
        </Container>


        <Modal show={this.state.showbank} onHide={this.hideBankModal} animation={false}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b>Please add bank details for source and destination</b>
        
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideBankModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showMon} onHide={this.hideMonModal} animation={false}>
          <Modal.Header>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b>Please add money in range </b>
            
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideMonModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        
      </div>
    );
  }
}

export default CounterOffer;
