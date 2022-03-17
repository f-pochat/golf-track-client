import './App.css';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from"./components/Profile";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link, Navigate
} from 'react-router-dom';
import Home from "./components/Home";
import {Component, Profiler, useState} from "react";



function App() {
    document.title = 'Golf Track'

    const [userOk, setUserOk] = useState(false)

    const userIsOkay = (childData) => {
        setUserOk(childData)
    }

  return (
    <div className="App">
       <Router>
            <Routes>
                <Route
                    path = "/"
                    element = {<Login parentCallback = {userIsOkay} />}/>

                <Route path="/home"
                       element={userOk ?  <Home/> : <Navigate to="/" />}/>

                <Route path="/profile"
                       element={<Profile/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
