import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";


function AddUser(props) {

    let navigate = useNavigate();
    const returnToHome = () => {
        navigate("/home");
    }

    return (
        <div className="d-flex justify-content-center">
            <link rel="stylesheet" href={require('./Login.css')}/>
            <div className="col-4"/>
            <div className="col-4">
                <div className="d-flex flex-column">
                    <form>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername1" className="form-label mt-4">Username</label>
                                <input type="text" className="form-control" id={"user"}
                                       placeholder="Enter admin username..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
                                <input type="text" className="form-control" id={"password"}
                                       placeholder="Enter admin password..." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleSelect1" className="form-label mt-4">Admin's role </label>
                                <select className="form-select" id="exampleSelect1">
                                    <option>Admin</option>
                                    <option>Editor</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={returnToHome}>Creat admin</button>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div className="col-4"/>
        </div>
    );
}

export default AddUser;