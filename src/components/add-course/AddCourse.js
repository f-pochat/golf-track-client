import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AddClubMapContainer from "../map/AddClubMapContainer";
import {IoIosCheckmark, IoIosTrash} from "react-icons/io";
import {Course} from "../../models/Course";
import AddHole from "./AddHole";

function AddCourse(props) {

    // Form
    const {id}=useParams();
    console.log(id);
    const [course, setCourse] = useState('');
    const [holes, setHoles] = useState(18);
    const [desc, setDesc] = useState('')
    const [location, setLocation] = useState('');
    const [clubHouse, setClubHouse] = useState({
        lat:0,
        lng:0,
    })

    const clubHouseData = (childData) => {
        setClubHouse(childData);
    }

    let navigate = useNavigate();
    const submitCourse = (e) => {
        e.preventDefault()
;

        if (course.length < 0 || (clubHouse.lng === 0 && clubHouse.lng === 0)) {
            return;
        }

        const courseData = new Course(course,localStorage.getItem('Name'),holes,desc,clubHouse);
        console.log(courseData)
        props.parentCallback(courseData);
        let path = '/addCourse/1';
        navigate(path);
    }

    return (
        <div className="d-flex justify-content-center h-100 ovh">
            <link rel="stylesheet" href={require('../login/Login.css')}/>
            <div className="d-flex flex-column w-100 justify-content-center ">
                <form onKeyPress={event => {
                        if (event.key === 'Enter'){
                            event.preventDefault();
                        }
                    }
                }>
                    <fieldset>

                        <div>
                            <div className="col-md-4 col-1"/>
                            <div className="form-group col-md-4 col-10 mx-auto">
                                <h4 htmlFor="exampleInputUsername1" className="form-label mt-4">Course name</h4>
                                <input type="text" id="input" className="form-control" id={"course"}
                                       placeholder="Enter course name..." onChange={e => setCourse(e.target.value)}/>
                            </div>
                            <div className="col-md-4 col-1"/>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-5 col-12">
                                <div className="row">
                                    <div className="col-md-4 col-12 mt-2 justify-content-start mb-2">
                                        <h4 htmlFor="exampleFormControlHoles">Holes</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                   id="9" checked={holes === 9} onChange={() => setHoles(9)}/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                     9
                                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input text-secondary" type="radio" name="flexRadioDefault"
                                                   id="18 " checked={holes === 18} onChange={() => setHoles(18)}/>
                                                <label className="form-check-label " htmlFor="flexRadioDefault2">
                                                    18
                                                </label>
                                        </div>

                                    </div>
                                    <div className="col-md-8 col-12">
                                        <div className="form-group">
                                            <h4 htmlFor="exampleFormControlTextarea1">Description</h4>
                                            <textarea className="form-control" style={{resize: "none"}} id="exampleFormControlTextarea1" placeholder="Enter description..." rows="10" value={desc} onChange={e => setDesc(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7">
                                <h4 htmlFor="exampleFormControlTeeBox" className="align-items-center">Mark Club House</h4>
                                <div className="d-flex justify-content-center">
                                    <AddClubMapContainer className="align-items-center" parentCallback = {clubHouseData} />
                                </div>
                            </div>
                        </div>

                        <AddHole course={course}/>

                        <button type="submit" className="btn btn-primary fixed-bottom mx-auto w-25 m-2" onClick={submitCourse}>Submit</button>

                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default AddCourse;