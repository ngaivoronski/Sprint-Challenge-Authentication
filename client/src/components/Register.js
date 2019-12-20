import React, { useState, useEffect } from "react";
import axios from 'axios';

const Register = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("");
    const [registered, setRegistered] = useState("");

    useEffect(() => {
        console.log("fire!");
    },[registered]);

    const handleChange = e => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const register = e => {
        // post request to retrieve a token from the backend
        e.preventDefault();
        axios
        .post("http://localhost:3300/api/auth/register", credentials)
        .then(response => {
            setError("");
            console.log(response);
            setRegistered(response.data.username);
            // once token is handeled, navigate to the jokes page
            // props.history.push("/profile-page");
        })
        .catch(err => {
            console.log("there was an error");
            console.log(err);
            setError("Error registering, please try again.");
        })
    };

    const goToLogin = e => {
        e.preventDefault();
        props.history.push("/");
    }

    return (
    <div className="home-page" style={{'text-align': 'center'}}>
        <h1>Welcome to Dad Jokes</h1>
        {registered === "" ?
        <div className="login-form">
            <h2>Register here for Dad Jokes!</h2>
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
                <button onClick={register} className="postButton">Register</button>
                <p>Already have an account?</p>
                <button onClick={goToLogin} className="postButton">Click here to login</button>
            </form>
        </div>
        : 
        <div>
            <h1>Thank you for registering {registered}! Please go to the Login page to view Dad Jokes.</h1>
            <button onClick={goToLogin} className="postButton">Click here to login</button>
        </div>
        
        
        }
    </div>
    );
}

export default Register;
