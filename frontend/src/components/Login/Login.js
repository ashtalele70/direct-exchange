import React, { Component } from "react";
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {withFirebase} from "../Firebase/FirebaseProvider";


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: null,
            show_logout: true,
            show_sign_up_error: true,
            show_error: false,
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(username, password)
            .then((authUser) => {
                if(authUser.user.emailVerified) this.props.history.push('/');
                else {
                    this.props.firebase.doSendEmailVerification();
                    this.props.firebase.doSignOut();
                    this.props.history.push('/verifyemail');
                }
            })
            .catch(error => {
                this.setState({ error: error, show_error: true });
            });
    };

    onSubmitGoogle = (event) => {
        event.preventDefault();
        this.props.firebase
            .doSignInWithGoogle()
            .then((socialAuthUser) => {
                if(socialAuthUser.additionalUserInfo.isNewUser) {
                    this.props.firebase.auth.currentUser.delete().then(
                        this.props.history.push({
                            pathname: "/",
                            show_sign_up_error: true,
                        })
                    );
                }else if(socialAuthUser.user.emailVerified)this.props.history.push('/');
                else {
                    this.props.firebase.doSendEmailVerification();
                    this.props.firebase.doSignOut();
                    this.props.history.push('/verifyemail');
                }
            })
            .catch(error => {
                this.setState({ error: error, show_error: true });
            });
    }

    onSubmitFacebook = (event) => {
        event.preventDefault();
        this.props.firebase
            .doSignInWithFacebook()
            .then((socialAuthUser) => {

                if(socialAuthUser.additionalUserInfo.isNewUser) {
                    // this.setState({show_sign_up_error: true});
                    this.props.firebase.auth.currentUser.delete().then(
                        this.props.history.push({
                            pathname: "/",
                            show_sign_up_error: true,
                        })
                    );
                } else if(socialAuthUser.user.emailVerified) this.props.history.push('/');
                else {
                    this.props.firebase.doSendEmailVerification();
                    this.props.firebase.doSignOut();
                    this.props.history.push('/verifyemail');
                }
            })
            .catch(error => {
                this.setState({ error: error, show_error: true });
            });
    }


    render() {
        const data = this.state;
        const isInvalid =
            data.username === "" ||
            data.password === "";

        let logout_message;
        if(this.props && this.props.location.logout) {
            if(this.state.show_logout)
                logout_message = (<Alert  variant='success' onLoad={setTimeout(() =>  this.setState( {show_logout: false}) , 3000)} onClose={() => this.setState( {show_logout: false})} dismissible>
                You have logged off!!!
            </Alert>);
        }


        let error;
        if(this.state.error) {
            error = (<Alert autohide variant='danger' onClick={setTimeout(() => this.setState( {show_error: false, error: null}), 3000)} onClose={() => this.setState( {show_error: false,  error: null})} dismissible>
                {this.state.error.message}
            </Alert>);
        }

        return(
            <div>
            <Card className="m-5 justify-content-center">
                {/*{signUpError}*/}
                {error}
                <Card.Body>
                    {logout_message}
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email/username"
                            onChange={(event) =>
                                this.setState({ username: event.target.value })
                            }
                        />
                        <Form.Text className="text-muted">
                           Your email is your username
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={(event) =>
                                this.setState({ password: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Button disabled={isInvalid} variant="primary" type="submit">
                        Login
                    </Button>
                    <p>
                        Don't have an account? <Link to={'/signup'}>Sign Up</Link>
                    </p>

                </Form>

                    <p></p>

                <Form onSubmit={this.onSubmitGoogle}>
                    <Button type="submit" variant="danger" >Log In with Google</Button>
                </Form>
                <p></p>
                <Form onSubmit={this.onSubmitFacebook}>
                    <Button type="submit">Log In with Facebook</Button>
                </Form>
                    {/*{this.state.error && <p>{this.state.error.message}</p>}*/}
                </Card.Body>
            </Card>
            </div>
        );
    }
}

const Login = withFirebase(LoginForm);
export default Login;

export { LoginForm }
