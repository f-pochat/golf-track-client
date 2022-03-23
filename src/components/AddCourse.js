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
        if (teeboxes.includes(tempTeeBox) || tempTeeBox==='') return;
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
                            <h2 htmlFor="exampleInputUsername1" className="form-label mt-4">Course name</h2>
                            <input type="text" className="form-control" id={"course"}
                                   placeholder="Enter course name..." onChange={e => setCourse(e.target.value)}/>
                        </div>

                        <div className="row mt-5">
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-4 mt-2">
                                        <h2 htmlFor="exampleFormControlHoles">Holes</h2>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                   id="9"/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                     09
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
                                            <h2 htmlFor="exampleFormControlTextarea1">Description</h2>
                                            <textarea className="form-control" style={{resize: "none"}} id="exampleFormControlTextarea1" rows="3"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="col-3 mt-2"/>
                                    <div className="col-6 mt-2">
                                        <img className="h-100 w-100" src = {require('../assets/index.png')} alt="Mapa"/>
                                    </div>
                                    <div className="col-3"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group w-75 mx-auto">
                                    <h2 htmlFor="exampleFormControlTeeBox">Tee Box</h2>
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