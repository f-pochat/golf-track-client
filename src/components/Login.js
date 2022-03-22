import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Box from '@material-ui/core/Box';


function Login(props) {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [incorrect, setIncorrect] = useState(false)

    let navigate = useNavigate();
    const submitUser = (e) => {
        e.preventDefault();
        const users = {
            'User' : user,
            'Password' : pass,
        }
        let path = '/home';

        if (users.User === 'Alejo' && users.Password === 'Salta'){
            navigate(path);
            props.parentCallback(true);
        }else{
            setIncorrect(true);
        }
    }
    return (
        <div style={{
            backgroundImage: `url("https://s1.1zoom.me/big0/553/_454805.jpg")`
        }}>

            <div className="d-flex justify-content-center">
                <link rel="stylesheet" href={require('./Login.css')}/>
                <div className="col-4"/>
                <div className="col-4">
                    <div className="d-flex flex-column">
                    <img className="pt-5 mx-auto ml-2" src = {require('../assets/golfMan.png')} alt="Golf Man"/>
                    <form>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername1" className="form-label mt-4 ">Username</label>
                                <input type="text" className="form-control" id={"user"}
                                      placeholder="Enter username..." onChange={e => setUser(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="form-label mt-4 text-light">Password</label>
                                <input type="password" className="form-control" id={"password"}
                                       placeholder="Enter password..." onChange={e => setPass(e.target.value)}/>
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={submitUser}>Enter</button>
                        </fieldset>
                        <div className="mt-4">
                            {incorrect ? <span className="lg-badge bg-danger mt-2" >Incorrect username or password</span> : null}

                        </div>
                    </form>
                </div>
                </div>
            <div className="col-4"/>
        </div>

    </div>
    );
}

export default Login;