import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import MapContainer from "./MapContainer";


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
                                <label htmlFor="exampleInputUsername1" className="form-label mt-4">Course name</label>
                                <input type="text" className="form-control" id={"court"}
                                       placeholder="Enter course name..." onChange={e => setCourt(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputText1" className="form-label mt-4">Course Location</label>
                                <MapContainer/>
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