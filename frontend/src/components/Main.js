import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import Logout from "./Logout/Logout";
import Verify from "./EmailVerification/EmailVerification";
import Rates from "./Rates/Rates";
import PostOffer from "./PostOffer/PostOffer";
import CounterOffer from "./Counter_offer/CounterOffer";
import GetMyCounterOffers from "./Counter_offer/GetMyCounterOffers";
import AddBank from "./Bank/AddBank";
import { OfferDashboardComponent } from "./OfferDashboard/offerDashboardComponent";
import { MyOffersComponent } from "./MyOffers/myOffersComponent";
import { withAuthentication } from "./Session/AuthUserContext";
import AutoMatch from "./AutoMatch/AutoMatch";
import { AcceptedOfferComponent } from "./AcceptedOffer/acceptedOfferComponent";
import About from "./Navbar/About";
import ViewBanks from "./Bank/ViewBanks";
import ViewTransactions from "./Transaction/viewTransactions";
import TransactionHistory from "./Reporting/transactionHistory";
import FinancialReport from "./Reporting/financialReport";

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
            <Route exact path="/" component={About} />
            <Route path="/rates" component={Rates} />
            <Route path="/postoffer" component={PostOffer} />
            <Route path="/counterOffer" component={CounterOffer} />
            <Route path="/MycounterOffer" component={GetMyCounterOffers} />
            <Route path="/offerDashboard" component={OfferDashboardComponent} />
            <Route path="/myOffers" component={MyOffersComponent} />
            <Route path="/addbank" component={AddBank} />
            <Route path="/logout" component={Logout} />
            <Route path="/autoMatch" component={AutoMatch} />
            <Route
              path="/viewAcceptedOffers"
              component={AcceptedOfferComponent}
            />
            <Route path="/viewBanks" component={ViewBanks} />
            <Route path="/ViewTransactions" component={ViewTransactions} />
            <Route path="/transactionHistory" component={TransactionHistory} />
            <Route path="/financialReport" component={FinancialReport} />
          </div>
        )}
        {!this.props.firebase.auth.currentUser && (
          <div>
            <Route path="/" component={Navbar} />
            <Route exact path="/" component={About} />
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
