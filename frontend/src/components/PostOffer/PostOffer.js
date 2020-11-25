import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Grid, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import CurrencyInput from 'react-currency-input';
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
class PostOffer extends Component{

    constructor(props) {
        super(props);
        this.state={source_country:"United",
                    source_currency:"",
                    remit_amount:"",
                    destination_country:"United",
                    destination_currency:"",
                    exchange_rate:"",
                    expiration_date:"",
                    allow_counter_offer:1,
                    allow_split_offer:1,
                    offer_status:"Pending",
                    is_counter:0,
                    rates:"", amount:"0.00",
                    remit_amount_destination:0}
        
      }
    
      componentDidMount(){
          this.getRates();
      }

      getInitialState(){
        return ({amount: "0.00"});
      }

    handleChange=(event, maskedvalue, floatvalue)=>{
        this.setState({amount: maskedvalue,remit_amount_destination:maskedvalue*this.state.exchange_rate});
        
      }

      exchageRate(){

        var rates=this.state.rates
        if (this.state.source_currency!=="" && this.state.destination_currency!==""){
          this.state.rates.map((gh, i)=>{
            if(this.state.source_currency===gh.source && this.state.destination_currency===gh.destination){
              this.setState({exchange_rate:gh.rate})
        }})
        }

      }

      sourceCurrencyChange=(event)=>{
       
        this.setState({source_currency:event.target.value}, () => {
          this.exchageRate();
      });
        
      }

      destinationCurrencyChange=(event)=>{
        console.log(this.state.allow_counter_offer)
        this.setState({destination_currency:event.target.value}, () => {
          this.exchageRate();
      });
        
      }

     
      submitHandler = (event) => {
        console.log(this.state)
        var values={user_id:1,
            source_country:this.state.source_country,
            source_currency:this.state.source_currency,
            remit_amount:this.state.amount,
            destination_country:this.state.destination_country,
            destination_currency:this.state.destination_currency,
            exchange_rate:this.state.exchange_rate,
            expiration_date:this.state.expiration_date,
            allow_counter_offer:this.state.allow_counter_offer,
            allow_split_offer:this.state.allow_split_offer,
            offer_status:"INIT",
            is_counter:0
        }
        
        axios
        .post("http://localhost:8080" + "/postoffer",values)
        .then((res) => {
          if (res.status === 200) {
            console.log("yay");
            if (res.data) {
              console.log(res.data);
            }
          }
        })
        .catch((err) => {});  
       
       
       
      };
      getRates = () => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
          "token"
        );
        
        axios
          .get("http://localhost:8080" + "/rates")
          .then((res) => {
            if (res.status === 200) {
              if (res.data) {
                console.log(res.data);
    
                this.setState({ rates: res.data });
              }
            }
          })
          .catch((err) => {});
      };
    render(){

        return(
<Container className="m-5 d-flex justify-content-center">
            <Form>
  <Form.Row>

  <Form.Group as={Col} controlId="formGridState">
    <Form.Label>From</Form.Label>
      <Form.Control as="select" defaultValue="Choose..." onChange={this.sourceCurrencyChange}>
        <option>Choose</option>
        {this.state.rates && this.state.rates.map((e, key) => {
    return <option key={key} value={e.Key}>{e.source}</option>;
 })}
      </Form.Control>
    </Form.Group>


    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>To</Form.Label>
      <Form.Control as="select" defaultValue="Choose..." onChange={this.destinationCurrencyChange}>
                   <option>Choose</option>
        
        {this.state.rates && this.state.rates.map((e, key) => {
    return <option key={key} value={e.Key}>{e.source}</option>;
 })}
      </Form.Control>
    </Form.Group>
    



  </Form.Row>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>  Send amount &nbsp; </Form.Label>
      <CurrencyInput value={this.state.amount} onChangeEvent={this.handleChange}/>
      
    </Form.Group>
  </Form.Row>

   <Form.Row>
   <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Exchange rate</Form.Label>
              <Form.Control
                type="name"
                readOnly="readOnly"
                value={this.state.exchange_rate}
              />
            </Form.Group>
   <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Recieve amount</Form.Label>
      <Form.Control
              type="name"
              value={this.state.remit_amount_destination}
            />
    </Form.Group>
     </Form.Row>  
 <Form.Row>
 <Form.Group as={Col} controlId="formGridPassword">
  <Form.Label>Expiry Date for the offer</Form.Label>
              <Form.Control
                type="date"
                placeholder="Expiry Date for the offer"
                onChange={(event) => this.setState({ expiration_date: event.target.value })}
              />

              
  </Form.Group>

  </Form.Row>

  <Form.Row>

  <OverlayTrigger overlay={
        <Tooltip id={`tooltip-top`}>
          Allows 
        </Tooltip>
      }> 
  <Form.Group as={Col} id="formGridCheckbox">
  <Form.Check type="switch" label="Allow Counter Offer"  id="custom-switch-counter" checked={this.state.allow_counter_offer} onChange={(event) => this.setState({ allow_counter_offer: event.target.checked })}/>
  </Form.Group>
  </OverlayTrigger>

  <OverlayTrigger overlay={
        <Tooltip id={`tooltip-top`}>
          allow
        </Tooltip>
      }> 
  <Form.Group as={Col} id="formGridCheckbox">
  <Form.Check type="switch" label="Allow split Offer"  id="custom-switch-split" checked={this.state.allow_split_offer} onChange={(event) => this.setState({ allow_split_offer: event.target.checked })} /> 
  </Form.Group>
  </OverlayTrigger>

  </Form.Row>
  
 
  <OverlayTrigger overlay={
        <Tooltip id={`tooltip-top`}>
          allow
        </Tooltip>
      }> 
  <Button variant="primary" type="submit" onClick={this.submitHandler}>
    Post Offer
  </Button>
  </OverlayTrigger>

</Form>
</Container>
        );
        
    }
}

export default PostOffer