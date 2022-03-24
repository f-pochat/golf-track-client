import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {gql, useMutation} from "@apollo/client";
import {IoIosAddCircleOutline, IoIosArrowBack} from "react-icons/io";


function AddUser(props) {

    const ADD = gql`
        mutation AddAdmin($user: String!, $password: String!, $role: String!) {
            addAdmin(input: {user: $user, password: $password, role: $role})
            {
                user
                password
                role
            }
  }`;

    const [user,setUser] = useState('');
    const [pass,setPass] = useState('');
    const [role, setRole] = useState('');
    const [incorrect, setIncorrect] = useState(false)


    const [addAdmin,{data, error, loading}] = useMutation(ADD);

    let navigate = useNavigate();

    const createAdmin = async(e) => {
        e.preventDefault();
        const users = {
            'User' : user,
            'Password' : pass,
            'Role': role,
        }

        let addedData = await  addAdmin({
                variables: {
                    user: user,
                    password: pass,
                    role: role,
                },

            }
        ).catch(e => console.log(e));

        if (addedData === undefined) {
            setIncorrect(true);
        }else{
            navigate('/home');
        }

    }

    const changedRadio = (e) => {
        setRole(e.target.value)
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
                                       placeholder="Enter admin username..." onChange={e => setUser(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
                                <input type="password" className="form-control" id={"password"}
                                       placeholder="Enter admin password..." onChange={e => setPass(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleSelect1" className="form-label mt-4">Admin's role </label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                           value="Admin" onChange={changedRadio}/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Admin
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                            value = "Editor" onChange={changedRadio}/>
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Editor
                                    </label>
                                </div>
                                <div className="mt-4">
                                    {incorrect ? <span className="lg-badge bg-danger mt-2 text-light" >Username already exists or data is invalid</span> : null}
                                </div>
                            </div>

                            <a href="/home" className="text-dark mr-5"><IoIosArrowBack size={40} className="m-2"/></a>
                            <button type="submit" className="btn btn-primary"  onClick={createAdmin}>Create admin</button>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div className="col-4"/>
        </div>
    );
}

export default AddUser;