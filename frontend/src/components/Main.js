import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";

import Navbar from "./Navbar/Navbar";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";

class Home extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
            </div>
        );
    }
}

export default Home;
