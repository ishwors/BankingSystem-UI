import React from "react";

import Navbar from "../components/Navbar.jsx";

import LoginForm from "../components/loginForm";


export default function Login() {
    return (
        <div>
            <Navbar />
            <center>
                <h2>Login Form</h2>
            </center>
            <LoginForm />
        </div>
    )
}

