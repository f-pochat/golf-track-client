import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";
import {IoIosEye, IoIosEyeOff} from "react-icons/io";

function Profile(props){

    const EDIT = gql`
        mutation AdminEdit($user: String!, $password: String!) {
            editAdmin(input: {user: $user, password: $password}){
                user
            }
  }`;

    const [editMode,setEditMode]=useState(false);
    const [edit,{data, error, loading}] = useMutation(EDIT);
    const [pass, setPass] = useState('');
    const [viewPass,setViewPass] = useState(false);

    const toggleEditMode = (e) => {
        e.preventDefault();
        setEditMode(true)
    }

    const untoggleEditMode = async(e) => {
        e.preventDefault();
        let editData = await edit({
                variables: {
                    user: localStorage.getItem('Name'),
                    password: pass,
                },
            }
        ).catch(e => console.log(e))


        if (editData !== undefined){
            setEditMode(false);
            navigate("/home");
        }
    }

    let navigate = useNavigate();
    const goToAddUser = () => {
        navigate("/addUser");
    }

    const logOut = () => {
        localStorage.clear();
        navigate('/');
    }

    const changePass = (e) => {
        setPass(e.target.value);
    }

    const toggleViewPass = () => {
        if (viewPass)setViewPass(false);
        else setViewPass(true);

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
                                <input type={viewPass?"text" : "password"} disabled={!editMode} className="form-control" id={"password"} defaultValue={"Salta"} onChange={changePass}/>
                            </div>
                            <span className="input-group-append">
                                <a className="text-dark" onClick={toggleViewPass}>{viewPass?<IoIosEyeOff size={30} className="mt-2"/>:<IoIosEye size={30} className="mt-2"/>}</a>
                            </span>
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