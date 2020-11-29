import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar/Navbar";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";
import Verify from "./EmailVerification/EmailVerification";
import Rates from "./Rates/Rates";
import PostOffer from "./PostOffer/PostOffer";
import CounterOffer from "./CounterOffer/CounterOffer";
import AddBank from "./Bank/AddBank";
import { OfferDashboardComponent } from "./OfferDashboard/offerDashboardComponent";
import { withAuthentication } from "./Session/AuthUserContext";
import AutoMatch from "./AutoMatch/AutoMatch";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.firebase.auth.currentUser && (
          <div>
            <Route path="/" component={Navbar} />
            <Route path="/verifyemail" component={Verify} />
            <Route path="/rates" component={Rates} />
            <Route path="/postoffer" component={PostOffer} />
            <Route path="/counterOffer" component={CounterOffer} />
            <Route path="/offerDashboard" component={OfferDashboardComponent} />
            <Route path="/addbank" component={AddBank} />
            <Route path="/logout" component={Logout} />
            <Route path="/autoMatch" component={AutoMatch} />
          </div>
        )}
        {!this.props.firebase.auth.currentUser && (
          <div>
            <Route path="/" component={Navbar} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/verifyemail" component={Verify} />
            <Route path="/logout" component={Logout} />
          </div>
        )}
      </div>
    );
  }
}

export default withAuthentication(Home);
