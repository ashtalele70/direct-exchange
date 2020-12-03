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
                                        this.getNickname();
                                    }
                                }
                            });
                    } else {
                        localStorage.removeItem("userId");
                        localStorage.removeItem("email");
                        localStorage.removeItem("nickname");
                    }

                },
            )
        }

        componentWillUnmount() {
            this.listener();
        }

        getNickname = () => {
            axios
                .get(process.env.REACT_APP_ROOT_URL + "/user/" + localStorage.getItem("userId"))
                .then((res) => {
                    if (res.status === 200) {
                    if (res.data) {
                        localStorage.setItem("nickname", res.data.nickname);
                    }
                    }
                })
            .catch((err) => {});
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
