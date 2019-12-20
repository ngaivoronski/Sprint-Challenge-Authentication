import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosWithAuth";

const Jokes = (props) => {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get("http://localhost:3300/api/jokes")
        .then(response => {
            console.log(response);
            setJokes(response.data);
        })
        .catch(error => {
            console.error("no data received", error);
        });
    }, []);

    useEffect(() => {
        if(!sessionStorage.token) {
            props.history.push("/");
        }
    }, []);

    const logOut = e => {
        e.preventDefault();
        sessionStorage.removeItem('token');
        props.history.push("/");
    }

    if (jokes === []) {
            return(
                <div style={{'text-align':'center'}}>
                    <button onClick={logOut} className="postButton">Logout</button>
                    <p>Loading</p>
                </div>
            )
        } else {
        console.log("here are the photos",props.userPhotos)
        return (
            <div className="joke-page-div" style={{'text-align':'center'}}>
                <h1>Dad Jokes!</h1>
                {jokes.map(joke => {
                    return(
                        <div className="joke-div">
                            <p>#{jokes.indexOf(joke)+1}. {joke.joke}</p>
                        </div>
                    )
                })}
                <button onClick={logOut} className="postButton">Logout</button>
            </div>
        );
    }

    
};


export default Jokes;