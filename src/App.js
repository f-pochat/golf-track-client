import './App.css';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from"./components/Profile";
import AddUser from "./components/AddUser";
import AddCourse from "./components/AddCourse";

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

    const [user, setUser] = useState({
        name:'',
        role:'',
    })

    const userIsOkay = (childData) => {
        setUser(childData)
    }

  return (
    <div className="App">
       <Router>
            <Routes>
                <Route
                    path = "/"
                    element = {<Login parentCallback = {userIsOkay} />}/>

                < Route path="/home"
                       //element={userOk ?  <Home/> : <Navigate to="/" />}/>
                        element={<Home/>} />

                <Route path="/profile"
                       element={<Profile/>}/>

                <Route path="/addUser"
                       element={<AddUser/>}/>

                <Route path="/addCourse"
                       element={<AddCourse/>}/>

            </Routes>
        </Router>
    </div>
  );
}

export default App;
