import React, {Component } from "react";
import {Alert, Button, Card, Form, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import {withAuthentication} from "../Session/AuthUserContext";

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign-in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            nickname: "",
            password: "",
            oauth_type: 0,
            confirm_password: "",
            show_pass_error: false,
            show_pass_length_error: false,
            error: null,
        };
    }

    componentWillUnmount() {
        this.props.firebase.doSignOut();
    }

    submitHandler = (event) => {
        event.preventDefault();
        const data = this.state;


        if (data.password && data.confirm_password &&
            data.password !== data.confirm_password) {
            this.setState({show_pass_error: true})
        } else if( data.password.length < 6){
            this.setState({show_pass_length_error: true})
        } else {
            this.setState({oauth_type: 3});
            const data = this.state;
            axios.post(process.env.REACT_APP_ROOT_URL +'/user', data).
            then((res) => {
                if (res.status === 200) {
                    this.props.firebase
                        .doCreateUserWithEmailAndPassword(this.state.username, this.state.password)
                        .then(authUser => {
                            this.props.firebase.doSendEmailVerification();
                            this.props.history.push("/verifyemail");
                        })
                        .catch(error => {
                            this.setState({ error });
                        });
                }
            })
                .catch(error => {
                    {error.response && this.setState({ error : {message : error.response && error.response.data.message }})};
                });
        }


    }

    onSubmitGoogle = (event) => {
        event.preventDefault();

                this.props.firebase
                    .doSignInWithGoogle()
                    .then(socialAuthUser => {
                        this.setState({error: null});
                        this.setState({oauth_type: 1});
                        this.setState({username: socialAuthUser.user.email});
                        this.setState({nickname: (socialAuthUser.user.email.split("@")[0]).replace(/[\W_]+/g,"")});
                        if(socialAuthUser.additionalUserInfo.isNewUser) {
                            axios.post(process.env.REACT_APP_ROOT_URL +'/user', this.state)
                        }
                    })
                    .then((socialAuthUser) => {
                            this.props.firebase.doSendEmailVerification();
                            this.props.firebase.doSignOut();
                            this.props.history.push("/verifyemail");
                    })
                    .catch(error => {
                        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                            error.message = ERROR_MSG_ACCOUNT_EXISTS;
                        }
                        this.setState({ error });
                    });
    }

    onSubmitFacebook = (event) => {
        event.preventDefault();
        this.props.firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                this.setState({ error: null });
                this.setState({oauth_type : 2});
                this.setState({username : socialAuthUser.user.email});
                this.setState({nickname : (socialAuthUser.user.email.split("@")[0]).replace(/[\W_]+/g,"")});
                if(socialAuthUser.additionalUserInfo.isNewUser) {
                    axios.post(process.env.REACT_APP_ROOT_URL +'/user', this.state)
                }
            })
            .then(socialAuthUser => {
                    this.props.firebase.doSendEmailVerification();
                    this.props.firebase.doSignOut();
                    this.props.history.push("/verifyemail");
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render(props) {
        const data = this.state;
        const isInvalid =
            data.nickname === "" ||
            data.username === "" ||
            data.password === "" ||
            data.confirm_password === "";

        let password_error;
        if(this.state.show_pass_error) {
            password_error = (<Alert autohide variant='danger' onClick={setTimeout(() => this.setState( {show_pass_error: false}), 3000)} onClose={() => this.setState( {show_pass_error: false})} dismissible>
            Passwords do not match
        </Alert>);
        }
        if(this.state.show_pass_length_error) {
            password_error = (<Alert autohide variant='danger' onClick={setTimeout(() => this.setState( {show_pass_length_error: false}), 3000)} onClose={() => this.setState( {show_pass_length_error: false})} dismissible>
                Password should be at least 6 characters
            </Alert>);
        }

        let error;
        if(this.state.error) {
            error = (<Alert autohide variant='danger' onClick={setTimeout(() => this.setState( {show_error: false, error: null}), 3000)} onClose={() => this.setState( {show_error: false,  error: null})} dismissible>
                {this.state.error.message}
            </Alert>);
        }
        return(

        <Card className="m-5 justify-content-center">
            <Card.Body>
            {password_error}
                {error}
            <Form onSubmit={this.submitHandler}>
                <Form.Row>
                     <Form.Group as={Col} controlId="username">
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
                            Your email will be your username
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} controlId="nickname">
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter nickname"
                            onChange={(event) =>
                                this.setState({ nickname: event.target.value })
                            }
                        />
                        <Form.Text className="text-muted">
                            Your nickname will be visible to other users
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                     <Form.Group as={Col} controlId="password">
                         <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={(event) =>
                                this.setState({ password: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="confirm_password">
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm"
                            onChange={(event) =>
                                this.setState({ confirm_password: event.target.value })
                            }
                        />
                    </Form.Group>
                </Form.Row>
                <Button disabled={isInvalid} variant="primary" type="submit">
                    Sign Up
                </Button>

                <p>
                    Have an account already? <Link to={'/login'}>Login</Link>
                </p>


                <p></p>


            </Form>
            <Form onSubmit={this.onSubmitGoogle}>
                <Button type="submit" variant="danger" >Sign In with Google</Button>
            </Form>
                <p></p>
            <Form onSubmit={this.onSubmitFacebook}>
                <Button type="submit">Sign In with Facebook</Button>
            </Form>
                {this.state.error && <p>{this.state.error.message}</p>}
            </Card.Body>
        </Card>

        );
    }
}
const SignUp = withAuthentication(SignUpForm);
export default SignUp;

export { SignUpForm }
