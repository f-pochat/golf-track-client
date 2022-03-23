import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IoIosCreate} from "react-icons/io";
//terreno reservado para Chalub Ignacio

function Profile(props){

    const [editMode,setEditMode]=useState(false);

    const toggleEditMode = (e) => {
        e.preventDefault();
        setEditMode(true)
    }

    const untoggleEditMode = (e) => {
        e.preventDefault();
        setEditMode(false);
        navigate("/home");
    }

    let navigate = useNavigate();
    const goToAddUser = () => {
        navigate("/addUser");
    }

    const logOut = () => {
        localStorage.clear();
        navigate('/');
    }

    return(
        <div className="d-flex justify-content-center">
            <link rel="stylesheet" href={require('./Login.css')}/>
            <div className="col-4"/>
            <div className="col-4">
                <div className="d-flex flex-column">
                    <form>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername1" className="form-label mt-4">Username</label>
                                <input disabled value={localStorage.getItem( 'Name' )} className="form-control"
                                       placeholder="Enter username..."/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
                                <input type="password" disabled={!editMode} className="form-control" id={"password"} defaultValue={"Salta"}/>

                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputRoll" className="form-label mt-4">Role</label>
                                <input disabled value={localStorage.getItem( 'Role' )} className="form-control"/>
                            </div>
                            <div className="flex-row">
                                <button className="btn btn-primary m-2" disabled={localStorage.getItem('Role') === 'Editor'} onClick={goToAddUser}>Add User</button>
                                <button className="btn btn-primary m-2" disabled={editMode} onClick={toggleEditMode} >Edit Password</button>
                                <button className="btn btn-primary m-2" disabled={!editMode} onClick={untoggleEditMode}>Save</button>
                                <button className="btn btn-danger m-2" onClick={logOut}>Log Out</button>
                            </div>

                        </fieldset>
                    </form>
                </div>
            </div>
            <div className="col-4"/>
        </div>
    );
}

export default Profile;