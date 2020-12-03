import React, { Component } from "react";
import { Card} from "react-bootstrap";
import {withFirebase} from "../Firebase/FirebaseProvider";


class EmailVerification extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div>
                <Card className="m-5 justify-content-center">
                    <Card.Body>
                        <Card.Header as="h5">
                            Verify your E-Mail
                        </Card.Header>
                        <Card.Title>
                            Verification E-Mail sent.
                            <br/>
                            Check your E-Mails (Spam folder
                            included) for a confirmation E-Mail or send
                            another confirmation E-Mail.
                        </Card.Title>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

const Verify = withFirebase(EmailVerification);
export default Verify;

export { EmailVerification }
