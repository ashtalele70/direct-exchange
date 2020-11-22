import React, {Component } from "react";
import {Alert, Button, Card, Form, Col} from "react-bootstrap";
import { withFirebase } from '../Firebase/FirebaseProvider';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            nickname: "",
            password: "",
            confirm_password: "",
            show_pass_error: false,
            error: null,
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        const data = this.state;


        if (data.password && data.confirm_password &&
            data.password !== data.confirm_password) {
            this.setState({show_pass_error: true})
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(data.username, data.password)
            .then(authUser => {
                console.log(authUser);
                this.props.history.push('/');
            })
            .catch(error => {
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
        return(

        <Card className="m-5 justify-content-center">
            <Card.Body>
            {password_error}
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
                {this.state.error && <p>{this.state.error.message}</p>}
            </Form>
            </Card.Body>
        </Card>

        );
    }
}
const SignUp = withFirebase(SignUpForm);
export default SignUp;

export { SignUpForm }
