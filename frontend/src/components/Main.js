import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";

import Navbar from "./Navbar/Navbar";
import Rates from "./Rates/Rates"
import PostOffer from "./PostOffer/PostOffer"
import { OfferDashboardComponent } from "./OfferDashboard/offerDashboardComponent";

class Home extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route path="/rates" component={Rates} />
                <Route path="/postoffer" component={PostOffer} />
                <Route path="/offerDashboard" component={OfferDashboardComponent} />
            </div>
        );
    }
}

export default Home;
