import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {AddHoleMapContainer} from "../map/AddHoleMapContainer";
import {faGolfBallTee, faFlag} from "@fortawesome/free-solid-svg-icons";
import './AddHole.css'
import {Hole} from "../../models/Course";

const AddHoleForm = forwardRef((props,ref) => {
    const course = props.course;
    const hole = props.hole;

    const [par,setPar] = useState(3);
    const [si,setSI] = useState(1);
    const [distance, setDistance] = useState(0);
    const [green, setGreen] = useState({
        lat:0,
        lng:0,
    })
    const [teebox, setTee] = useState({
        lat:0,
        lng:0,
    })


    const teeboxData = (childData) => {
        setTee(childData);
    }

    const greenData = (childData) => {
        setGreen(childData);
    }

    const saveHole = (e) => {
        e.preventDefault();
        course.addHole(hole,new Hole(hole,par,si,distance,green,teebox))
        course.holesList[hole-1].setSaved();
        props.closeModal();
    }

    return (
        <div>
            <form>
                <fieldset>
                    <div className="row d-flex justify-content-center">
                        <h1 className="mt-4">Hole {hole}</h1>
                    </div>
                    <div className="row justify-content-around">
                        <div className="form-group">
                            <label htmlFor="exampleSelect1" className="form-label mt-4">Par</label>
                            <select className="form-select ml-4" id="exampleSelect1" onChange={e => setPar(e.target.value)} defaultValue={course.holesList[hole - 1].par}>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleSelect1" className="form-label mt-4">Scoring Index</label>
                            <select className="form-select ml-4" id="exampleSelect1" onChange={e => setSI(e.target.value)} defaultValue={course.holesList[hole - 1].scoringIndex}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                {
                                   course.holes === 9 ? null :     <>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                        <option value={14}>14</option>
                                        <option value={15}>15</option>
                                        <option value={16}>16</option>
                                        <option value={17}>17</option>
                                        <option value={18}>18</option>
                                    </>
                                }
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleYds" className="form-label mt-4">Distance</label>
                            <input id="exampleYds" className="ml-4 mr-1" type="number" defaultValue={course.holesList[hole - 1].distance} onChange={e => setDistance(e.target.value)}/>
                            <label className="form-label mt-4">yds</label>
                        </div>
                    </div>
                    <div className="d-flex row justify-content-around mt-4">
                        <div className="d-flex flex-column justify-content-center">
                            <h4 htmlFor="exampleFormControlTeeBox">Mark Middle of Green</h4>
                            <div className="d-flex justify-content-center">
                                <AddHoleMapContainer
                                    usage="green"
                                    icon = {faFlag}
                                    hole={hole}
                                    parentCallback = {greenData}
                                    course={course}/>
                            </div>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <h4 htmlFor="exampleFormControlTeeBox">Mark Teebox</h4>
                            <div className="d-flex justify-content-center">
                                <AddHoleMapContainer
                                    usage = "teebox"
                                    icon = {faGolfBallTee}
                                    hole={hole}
                                    parentCallback = {teeboxData}
                                    course={course}/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <button type="submit" className="btn btn-danger w-25 m-2" onClick={() => props.closeModal()}>Cancel</button>
                        <button type="submit" className="btn btn-success w-25 m-2" onClick={saveHole}>Save</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
});

export default AddHoleForm;