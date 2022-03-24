import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";
import {IoIosArrowBack, IoIosEye, IoIosEyeOff} from "react-icons/io";

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
    const [incorrect, setIncorrect] = useState(false);
    const [message, setMessage] = useState('');

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
        ).catch(e => setMessage(e.message))


        if (editData !== undefined){
            setEditMode(false);
            navigate("/home");
        }else{
            setIncorrect(true);
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
                                <div className="input-group ">
                                    <input type={viewPass?"text" : "password"} disabled={!editMode} className="form-control" id={"password"} onChange={changePass}/>
                                     <span className="input-group-append ml-2">
                                    <a className="text-dark" onClick={toggleViewPass}>{viewPass?<IoIosEyeOff size={30} className="mt-2"/>:<IoIosEye size={30} className="mt-2"/>}</a>
                            </span>
                                </div>


                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputRoll" className="form-label mt-4">Role</label>
                                <input disabled value={localStorage.getItem( 'Role' )} className="form-control"/>
                            </div>
                            <div className="mt-4">
                                {incorrect ? <span className="lg-badge bg-danger mt-2 text-light" > {message} </span> : null}
                            </div>
                            <div className="flex-row">
                                <button className="btn btn-primary m-2" disabled={localStorage.getItem('Role') === 'Editor'} onClick={goToAddUser}>Add User</button>
                                <button className="btn btn-primary m-2" disabled={editMode} onClick={toggleEditMode} >Edit Password</button>
                                <button className="btn btn-primary m-2" disabled={!editMode} onClick={untoggleEditMode}>Save</button>
                                <a href="/home" className="text-dark mr-1"><IoIosArrowBack size={40} className="m-2"/></a>
                                <button className="btn btn-danger ml-2" onClick={logOut}>Log Out</button>
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