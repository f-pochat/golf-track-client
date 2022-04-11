import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import MapContainer from "../map/AddClubMapContainer";
import {IoIosCheckmark, IoIosCreate, IoIosTrash} from "react-icons/io";
import {Course} from "../../models/Course";
import AddClubMapContainer from "../map/AddClubMapContainer";
import {gql, useMutation} from "@apollo/client";
import {Teebox} from "../../models/Teebox";


function AddCourse(props) {

    const [tempTeeBox, setTempTeeBox] = useState('');

    // Form
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


    let [teeboxes, setTeeBoxes] = useState([]);

    let navigate = useNavigate();
    const submitCourse = (e) => {
        e.preventDefault()
;

        if (teeboxes.length < 1 || course.length < 0 || (clubHouse.lng === 0 && clubHouse.lng === 0)) {
            return;
        }

        const courseData = new Course(course,localStorage.getItem('Name'),holes,desc,clubHouse,teeboxes);
        console.log(courseData)
        props.parentCallback(courseData);
        let path = '/addCourse/1';
        navigate(path);
    }

    const handleChange = (e) => {
        setTempTeeBox(e.target.value);
    }
//agregar al array de tees
    const pushTeeBox = () => {
        if (teeboxes.includes(tempTeeBox) || tempTeeBox==='' || teeboxes.length >= 6) return;
        let aux = teeboxes.concat(new Teebox(tempTeeBox,"#000", 0,0))
        setTeeBoxes(aux);
        setTempTeeBox('');
    }

    const popTeeBox = (name) => {
        let aux = teeboxes.filter(value => {
            return value.name !== name;
        })
        setTeeBoxes(aux);
    }

    const modifyColor = (index, newColor) => {
        let aux = teeboxes;
        aux[index].color = newColor;
        setTeeBoxes(aux);
    }

    const modifyCR = (index, newCR) => {
        let aux = teeboxes;
        aux[index].course_rating = newCR;
        setTeeBoxes(aux);
    }

    const modifySR = (index, newSR) => {
        let aux = teeboxes;
        aux[index].slope_rating = newSR;
        setTeeBoxes(aux);
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
                                <input type="text" className="form-control" id={"course"}
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
                                            <textarea className="form-control" style={{resize: "none"}} id="exampleFormControlTextarea1" rows="3" value={desc} onChange={e => setDesc(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="col-md-3 col-12 mt-2"/>
                                    <div className="col-md-6 col-12 mt-5">
                                        <h4 htmlFor="exampleFormControlTeeBox">Mark Club House</h4>
                                        <AddClubMapContainer parentCallback = {clubHouseData} />
                                    </div>
                                    <div className="col-md-3 col-12"/>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="form-group w-75 mx-auto">
                                    <h4 htmlFor="exampleFormControlTeeBox">Tee Box</h4>
                                    <div className="row">
                                        <div className="col-10">
                                            <input type="text" className="form-control"
                                                   placeholder="Enter tee box..." value={tempTeeBox} onChange={handleChange}/>
                                        </div>
                                        <div className="col-2">
                                            <a onClick={pushTeeBox}><IoIosCheckmark className="text-dark" size={40}/></a>
                                        </div>
                                    </div>

                                    <table className="table mt-3">
                                        <thead>
                                        <tr>
                                            <th scope="col">Color</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">CR</th>
                                            <th scope="col">SR</th>
                                            <th scope="col">DELETE</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            teeboxes.map((teebox, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>
                                                            <input style={{alignItems:'center'}} type="color" color={teebox.color} className="align-middle" onChange={e => {
                                                                modifyColor(index, e.target.value)
                                                                }
                                                            }/>
                                                        </td>
                                                        <td>{teebox.name}</td>
                                                        <td className>
                                                            <input type="number" className="form-control" onChange={e =>
                                                                modifyCR(index,e.target.value)}/>
                                                        </td>
                                                        <td>
                                                            <input type="number" className="form-control" onChange={e =>
                                                                modifySR(index,e.target.value)
                                                            }/>
                                                        </td>
                                                        <td>
                                                            <a href="#" onClick={() => {
                                                                popTeeBox(teebox)}
                                                            }><IoIosTrash className="text-danger ml-3" size={40}/></a>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary fixed-bottom mx-auto w-25 m-2" onClick={submitCourse}>Next</button>

                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default AddCourse;