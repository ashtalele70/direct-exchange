import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import {withAuthentication} from "../Session/AuthUserContext";
import {Link} from "react-router-dom";

class About extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return(

            <div>
                {!this.props.firebase.auth.currentUser &&


            <Container>

            <h1>How DirectExchange Works</h1>
            <div className="image-list-item--container">
                <div className="three-column-image-list--item--items">
                    <div className="row">

                        <div className="col-xs-12 col-md-4 three-column-image-list--item ">

                            <div className="image-list-item">


                                <div className="image-list-item--image--container">
                                    <img
                                        src="https://www.ofx.com/-/media/Icons/Iconography 2017/OFX Homepage Business/Register with OFX.ashx?h=100&amp;w=100&amp;la=en-US&amp;hash=9CDA7F3C58ACCDA78136D793B20D67E0"
                                        className="image-list-item--image" alt="register"/></div>

                                <div className="image-list-item--container">
                                    <h3 className="h4">1. Sign up & lock-in your transfer</h3>
                                    <p className="image-list-item--copy">Simply tell us how much you’re
                                        transferring, which currency and who to send it to.</p>
                                </div>


                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4 three-column-image-list--item ">

                            <div className="image-list-item">


                                <div className="image-list-item--image--container">
                                    <img
                                        src="https://www.ofx.com/-/media/Icons/Iconography 2017/OFX Homepage Personal/Send-Us-your-funds.ashx?h=100&amp;w=100&amp;la=en-US&amp;hash=74021D8E4EEEC71BF2F1D47D4B447CCF"
                                        className="image-list-item--image" alt="send us your funds"/></div>

                                <div className="image-list-item--container">
                                    <h3 className="h4">2. Send us your funds</h3>
                                    <p className="image-list-item--copy">We accept wire transfers from your bank
                                        account or you can apply to set up an ACH direct debit. No cash,
                                            credit card, checks or bank drafts.</p>
                                </div>


                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4 three-column-image-list--item flat-bottom">

                            <div className="image-list-item">


                                <div className="image-list-item--image--container">
                                    <img
                                        src="https://www.ofx.com/-/media/Icons/Iconography 2017/OFX Homepage Personal/We-deliver-to-your-recipient.ashx?h=100&amp;w=100&amp;la=en-US&amp;hash=992B82767D97B5C33F3C3801F3D70DA8"
                                        className="image-list-item--image" alt="we deliver to your recipient"/>
                                </div>

                                <div className="image-list-item--container">
                                    <h3 className="h4">3. We deliver to your recipient</h3>
                                    <p className="image-list-item--copy">Transfers to most countries take 1-2
                                        business days. Track your transfer online or with our mobile app.</p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>}
                {this.props.firebase.auth.currentUser &&
                <div className="ml-5 align-content-center" >
                    <h1 className="ml-5">Welcome to DirectExchange</h1>
                    <br/>
                    <br/>
                    <h4>You can start by adding <Link to="/addbank">Bank</Link> or go to <Link to="/offerDashboard">Offer Dashboard</Link> to browse offers</h4>
                    {/*<h4>Or</h4>*/}
                    {/*<h4>Go to <Link to="/offerDashboard">Offer Dashboard</Link> to browse offers</h4>*/}
                </div>}
            </div>
        )
    }
}


export default withAuthentication(About);
