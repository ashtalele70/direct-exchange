import React, { Component } from "react";
import { FirebaseContext } from '../Firebase/FirebaseProvider';
import {LoginForm} from "../Login/Login";

const SignOut = () => (
        <FirebaseContext.Consumer>
            {firebase => <LoginForm firebase={firebase} signout={"You have logged off!!!"} />}
        </FirebaseContext.Consumer>
);

export default SignOut;
