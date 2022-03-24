import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./Login.css";
import {gql, useMutation} from "@apollo/client";
import {IoIosEye, IoIosEyeOff} from "react-icons/io";



function Login(props) {
    const LOGIN = gql`
        mutation AdminLogin($user: String!, $password: String!) {
            loginAdmin(input: {user: $user, password: $password})
            {
                token
                role
            }
  }`;

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [incorrect, setIncorrect] = useState(false);
    const [viewPass, setViewPass] = useState(false);

    const [login] = useMutation(LOGIN);


    let navigate = useNavigate();

    const submitUser = async(e) => {
        e.preventDefault();
        let loginData = await  login({
                variables: {
                    user: user,
                    password: pass,
                },
            }
        ).catch(e => console.log(e));

        if (loginData === undefined) {
            setIncorrect(true);
        }else{
            localStorage.setItem('TOKEN', loginData.data["loginAdmin"].token);
            const admin = {
                name: user,
                role: loginData.data["loginAdmin"].role,
            }

            props.parentCallback(admin);
            navigate('/home');
        }
    }

    const toggleView = () => {
        if (viewPass){
            setViewPass(false);
        }else{
            setViewPass(true);
        }
    }

    return (
        <div className="d-flex justify-content-center">

                <link rel="stylesheet" href={require('./Login.css')}/>
                <div className="col-4"/>
                <div className="col-4">
                    <div className="d-flex flex-column">
                        <div className="mt-4">
                            {incorrect ? <span className="lg-badge bg-danger mt-2 text-light" >Incorrect username or password</span> : null}

                        </div>
                    <img className="pt-5 mx-auto ml-2" src = {require('../assets/golfMan.png')} alt="Golf Man"/>
                    <form>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername1" className="form-label mt-4 text-dark">Username</label>
                                <input type="text" className="form-control" id={"user"}
                                      placeholder="Enter username..." onChange={e => setUser(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label mt-4 text-dark">Password</label>
                                <div className="input-group mt-2">
                                    <input type={viewPass ? "text" : "password"} className="form-control" id={"password"}
                                           placeholder="Enter password..." onChange={e => setPass(e.target.value)}/>
                                    <span className="input-group-append">
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                         <a className="text-dark" onClick={toggleView}>{viewPass?<IoIosEyeOff className="mt-2" size={30}/>:<IoIosEye className="mt-2" size={30}/>}</a>
                                    </span>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={submitUser}>Enter</button>
                        </fieldset>

                    </form>
                </div>
                </div>
            <div className="col-4"/>
        </div>
    );
}

export default Login;

/* <div style={{
            backgroundImage: `url("https://s1.1zoom.me/big0/553/_454805.jpg")`
        }}>*/