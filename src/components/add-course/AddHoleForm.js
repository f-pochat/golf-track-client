import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {AddHoleMapContainer} from "../map/AddHoleMapContainer";
import {faGolfBallTee} from "@fortawesome/free-solid-svg-icons";
import {HoleTeebox} from "../../models/Hole";

const AddHoleForm = forwardRef((props,ref) => {
    const course = props.course;
    const teeIndex = props.teebox;

    const [hole, setHole] = useState(props.hole);
    const [par,setPar] = useState(3);
    const [si,setSI] = useState(1);
    const [teebox, setTee] = useState({
        lat:0,
        lng:0,
    })
    const [saved, setSaved] = useState('');

    useEffect( () => {
        setSaved('');
    }, [props.data]);

    useImperativeHandle(ref, () => ({

        refresh(){
            setTee({
                lat:0,
                lng:0,
            })
            setSaved('');
            setHole(props.hole);
        }

    }));

    const saveTee = (e) => {
        e.preventDefault();
        if (saved !== teeIndex){
            setSaved(teeIndex);
            props.parentCallback(new HoleTeebox(course.teeboxes[teeIndex].name,course.teeboxes[teeIndex].color,par,si,teebox));
        }else{
            setSaved(teeIndex);
            //hole.modifyTeebox(course.teeboxes[teeIndex].name,course.teeboxes[teeIndex].color,par,si,teebox);
        }

    }

    const teeboxData = (childData) => {
        setTee(childData);
    }

    return (
        <div>
            <form>
                <fieldset>
                    <div className="row">
                        <div className="col-3"/>
                        <div className="form-group col-3">
                            <label htmlFor="exampleSelect1" className="form-label mt-4">Par</label>
                            <select className="form-select ml-4" id="exampleSelect1" onChange={e => setPar(e.target.value)}>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label htmlFor="exampleSelect1" className="form-label mt-4">Scoring Index</label>
                            <select className="form-select ml-4" id="exampleSelect1" onChange={e => setSI(e.target.value)}>
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
                        <div className="col-3">
                            <button type="submit" className={teeIndex === saved ?"btn btn-success w-25 m-2": "btn btn-danger w-25 m-2"} onClick={saveTee}>Save</button>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <h4 htmlFor="exampleFormControlTeeBox">Mark Teebox</h4>
                        <div className="d-flex justify-content-center">
                            <AddHoleMapContainer icon = {faGolfBallTee} pinColor = {course.teeboxes[teeIndex].color} parentCallback = {teeboxData}/>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
});

export default AddHoleForm;