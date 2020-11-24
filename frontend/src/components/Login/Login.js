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
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(username, password)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error });
            });
    };
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

        return(
            <div>
            <Card className="m-5 justify-content-center">
                <Card.Body>
                    {logout_message}
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter username"
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
                    {this.state.error && <p>{this.state.error.message}</p>}
                </Form>
                </Card.Body>
            </Card>
            </div>
        );
    }
}

const Login = withFirebase(LoginForm);
export default Login;

export { LoginForm }
