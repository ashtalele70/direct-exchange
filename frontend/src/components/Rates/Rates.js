import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table'
import axios from "axios";

class Rates extends Component{

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
          .get(process.env.REACT_APP_ROOT_URL + "/rates")
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

        const rates=this.state.rates.map((rate,index)=>(
            <tr>
                <td>{rate.source_currency}</td>
                <td>{rate.source_country}</td>
                <td>{rate.destination_currency}</td>
                <td>{rate.destination_country}</td>
                <td>{rate.rate}</td>
            </tr>
        ));
        return(

            <Container className="m-5 d-flex justify-content-center">
                <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>From Currency</th>
                    <th>From Country</th>
                    <th>To Currency</th>
                    <th>To country</th>
                    <th>Prevailing Rate</th>
                </tr>
            </thead>
            <tbody>
                {rates}
            </tbody>
            
            </Table>
            </Container>
        );
        
    }
}

export default Rates
