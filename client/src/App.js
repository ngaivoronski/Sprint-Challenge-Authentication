import React, { useState, useEffect } from 'react';
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Link } from "react-router-dom";
import Jokes from './components/Jokes';

function App() {

    return (
        <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/jokes" component={Jokes}/>
        </div>
    );
}

export default App;
