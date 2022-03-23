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

    const userEntered = (childData) => {
        localStorage.setItem('Name', childData.name);
        localStorage.setItem('Role', childData.role);
    }

    const getName = () => {
        return localStorage.getItem( 'Name' ) || '';
    }

    const getRole = () => {
        return localStorage.getItem( 'Role' ) || '';
    }

  return (
    <div className="App">
       <Router>
            <Routes>
                <Route
                    path = "/"
                    element = {<Login parentCallback = {userEntered} />}/>

                < Route path="/home"
                       element={getName() === '' ? <Navigate to="/" /> :  <Home user = {getName()} />}/>

                <Route path="/profile"
                       element={getName() === '' ? <Navigate to="/" /> :  <Profile user = {getName()} role = {getRole()} />}/>

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
