import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";


function AddUser(props) {
    const [user,setUser] =useState('');
    const [pass,setPass] =useState('');
    const [incorrect, setIncorrect] = useState(false)

    let navigate = useNavigate();

    const createAdmin = (e) => {
        e.preventDefault();
        const users = {
            'User' : user,
            'Password' : pass,
        }
        let path = '/home';

        if (users.User !== '' && users.Password !== ''){
            navigate(path);
            props.parentCallback(true);
        }else{
            setIncorrect(true);
        }
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
                                <select className="form-control" id="exampleSelect1">
                                    <option>Editor</option>
                                    <option>Admin</option>
                                </select>
                                <div className="mt-4">
                                    {incorrect ? <span className="lg-badge bg-danger mt-2" >Invalid data</span> : null}
                                </div>
                            </div>

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