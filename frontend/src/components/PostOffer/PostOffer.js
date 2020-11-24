import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Grid, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table'
import axios from "axios";

class PostOffer extends Component{

    constructor(props) {
        super(props);
        this.state={rates:[]}
        
      }
    
      componentDidMount(){
          this.getRates();
      }

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
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>send amount</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>recieve amount</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>
        );
        
    }
}

export default PostOffer