import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";


function AddCourse(props) {

    const [court, setCourt] = useState('');
    const [location, setLocation] = useState('');

    let navigate = useNavigate();
    const submitCourt = (e) => {
        e.preventDefault();
        const users = {
            'Court' : court,
            'Location' : location,
        }
        let path = '/home';
        navigate(path);
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
                                <label htmlFor="exampleInputUsername1" className="form-label mt-4">Court name</label>
                                <input type="text" className="form-control" id={"court"}
                                       placeholder="Enter court name..." onChange={e => setCourt(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputText1" className="form-label mt-4">Court Location</label>
                                <input type="text" className="form-control" id={"location"}
                                       placeholder="Enter location..." onChange={e => setLocation(e.target.value)}/>
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={submitCourt}>Add Court</button>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div className="col-4"/>
        </div>
    );
}

export default AddCourse;