import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar/Navbar";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";
import {withAuthentication} from "./Session/AuthUserContext";



class Home extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.authUser && (
                    <div>
                        <Route path="/" component={Navbar} />
                        <Route path="/logout" component={Logout} />
                    </div>
                )}
                {
                 !this.props.authUser && (
                     <div>
                         <Route path="/" component={Navbar} />
                         <Route path="/signup" component={SignUp} />
                         <Route path="/login" component={Login} />
                         <Route path="/logout" component={Logout} />
                     </div>
                 )
                }
            </div>
        );
    }
}

export default withAuthentication(Home);
