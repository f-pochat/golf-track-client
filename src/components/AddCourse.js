import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import MapContainer from "./MapContainer";
import {IoIosCheckmark, IoIosCreate, IoIosTrash} from "react-icons/io";


function AddCourse(props) {

    const [tempTeeBox, setTempTeeBox] = useState('');
    const [course, setCourse] = useState('');
    const [location, setLocation] = useState('');
    let [teeboxes, setTeeBoxes] = useState([]);

    let navigate = useNavigate();
    const submitCourse = (e) => {
        e.preventDefault();

        /*
        const users = {
            'Court' : court,
            'Location' : location,
        }*/
        let path = '/home';
        navigate(path);
    }

    const handleChange = (e) => {
        setTempTeeBox(e.target.value);
    }
//agregar al array de tees
    const pushTeeBox = () => {
        if (teeboxes.includes(tempTeeBox) || tempTeeBox==='' || teeboxes.length >= 6) return;
        let aux = teeboxes.concat(tempTeeBox)
        setTeeBoxes(aux);
        setTempTeeBox('');
    }

    const popTeeBox = (name) => {
        let aux = teeboxes.filter(value => {
            return value !== name;
        })
        setTeeBoxes(aux);
    }

    return (
        <div className="d-flex justify-content-center h-100 overflow-hidden">
            <link rel="stylesheet" href={require('./Login.css')}/>
            <div className="d-flex flex-column w-100 justify-content-center ">
                <form onKeyPress={event => {
                        if (event.key === 'Enter'){
                            event.preventDefault();
                        }
                    }
                }>
                    <fieldset>

                        <div className="form-group w-25 mx-auto">
                            <h4 htmlFor="exampleInputUsername1" className="form-label mt-4">Course name</h4>
                            <input type="text" className="form-control" id={"course"}
                                   placeholder="Enter course name..." onChange={e => setCourse(e.target.value)}/>
                        </div>

                        <div className="row mt-5">
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-4 mt-2 justify-content-start">
                                        <h4 htmlFor="exampleFormControlHoles">Holes</h4>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                   id="9"/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                     9
                                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input text-secondary" type="radio" name="flexRadioDefault"
                                                   id="18 " checked/>
                                                <label className="form-check-label " htmlFor="flexRadioDefault2">
                                                    18
                                                </label>
                                        </div>

                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <h4 htmlFor="exampleFormControlTextarea1">Description</h4>
                                            <textarea className="form-control" style={{resize: "none"}} id="exampleFormControlTextarea1" rows="3"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="col-3 mt-2"/>
                                    <div className="col-6 mt-2">
                                        <h2 htmlFor="exampleFormControlTeeBox">Mark Club House</h2>
                                        <MapContainer/>
                                    </div>
                                    <div className="col-3"/>
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
                                            teeboxes.map((teebox) => {
                                                return(
                                                    <tr>
                                                        <td>
                                                            <input style={{alignItems:'center'}} type="color" className="align-middle"/>
                                                        </td>
                                                        <td>{teebox}</td>
                                                        <td className>
                                                            <input type="number" className="form-control"/>
                                                        </td>
                                                        <td>
                                                            <input type="number" className="form-control"/>
                                                        </td>
                                                        <td>
                                                            <a href="#" onClick={() => {popTeeBox(teebox)}}><IoIosTrash className="text-danger ml-3" size={40}/></a>
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