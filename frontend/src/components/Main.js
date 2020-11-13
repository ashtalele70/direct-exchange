import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";

import Navbar from "./Navbar/Navbar";

class Home extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
            </div>
        );
    }
}

export default Home;
