import React, { Component } from 'react';
import {Redirect} from 'react-router';
import {withFirebase} from "../Firebase/FirebaseProvider";

class LogoutForm extends Component {
        constructor(props) {
                super(props);
        }
        componentDidMount() {
                this.props.firebase.doSignOut();
                this.props.history.push({
                        pathname: '/login',
                        logout: true
                });
        }


        logout = () => {
                return <Redirect to='/login'  />
        }

        render() {
                return (
                    <div></div>
                );
        }
}

const Logout = withFirebase(LogoutForm);
export default Logout;
