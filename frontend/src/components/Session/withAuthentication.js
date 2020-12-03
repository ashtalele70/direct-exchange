import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase/FirebaseProvider';
import axios from "axios";

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null
            };
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    authUser
                        ? this.setState({ authUser })
                        : this.setState({ authUser: null });
                    if(authUser) {
                        var params = new URLSearchParams();
                        params.set("email", authUser.email);
                        localStorage.setItem("email", authUser.email);
                        axios
                            .get(process.env.REACT_APP_ROOT_URL + "/user?" + params.toString())
                            .then((res) => {
                                if (res.status === 200) {
                                    if (res.data) {
                                        localStorage.setItem("userId", res.data);
                                    }
                                }
                            });
                    } else {
                        localStorage.removeItem("userId");
                    }

                },
            )
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;
