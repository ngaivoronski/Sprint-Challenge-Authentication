import React, { useState, useEffect } from "react";
import axios from 'axios';

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("");

    const handleChange = e => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const login = e => {
        // post request to retrieve a token from the backend
        e.preventDefault();
        axios
        .post("http://localhost:3300/api/auth/login", credentials)
        .then(response => {
            setError("");
            console.log(response);
            sessionStorage.setItem("token", response.data.token);
            // once token is handeled, navigate to the jokes page
            props.history.push("/jokes");
        })
        .catch(err => {
            console.log("there was an error");
            console.log(err);
            setError("Error logging in, please try again.");
        })
    };

    const goToSignUp = e => {
        e.preventDefault();
        props.history.push("/register");
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            props.history.push("/jokes");
        }
    },[]);

    return (
    <div className="home-page" style={{'text-align': 'center'}}>
        <h1>Welcome to Dad Jokes</h1>
        <div className="login-form">
            <h2>Please login to view jokes</h2>
            <h4>{error}</h4>
            <form>
                <div className="input-div">
                    <label htmlFor="username">Username:</label>
                    <input className="titleStyles"
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="password">Password:</label>
                    <input className="titleStyles"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={login} className="postButton">Log in</button>
                <p>Don't have an account?</p>
                <button onClick={goToSignUp} className="postButton">Create Account</button>
            </form>
        </div>
    </div>
    );
}

export default Login;
