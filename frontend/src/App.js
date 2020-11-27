import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import { withAuthentication } from './components/Session/AuthUserContext';
import './App.css';

  class App extends Component {

      render() {
      return (
          <BrowserRouter>
            <div>
              {/* App Component Has a Child Component called Main*/}
              <Main/>
            </div>
          </BrowserRouter>
      );
    }
  }


export default withAuthentication(App);
