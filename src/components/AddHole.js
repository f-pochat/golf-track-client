import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AddHoleForm from "./AddHoleForm";
import {AddHoleMapContainer} from "./map/AddHoleMapContainer";
import {faCircleDot, faMapPin} from "@fortawesome/free-solid-svg-icons";
import './AddHole.css';
import {Hole} from "../models/Hole";

const AddHole = (props) => {
    const course = props.course;
    const {number} = useParams();
    const [currentTab, setCurrentTab] = useState(0);

    const navigate = useNavigate();

    const [green, setGreen] = useState({
        lat:0,
        lng:0,
    });

    const [fw, setFw] = useState({
        lat:0,
        lng:0,
    });

    const hole = new Hole(number,green,fw);

    const greenData = (childData) => {
        setGreen(childData);
    }

    const fwData = (childData) => {
        setFw(childData);
    }

    const addHole = () => {
        course.addHole(hole);

        if (parseInt(number) === course.holes){
            navigate('/home')
        }else{
            let path = '/addCourse/' + (parseInt(number)+1);
            navigate(path);
        }

    }

    return (
        <div className="d-flex flex-column w-100 justify-content-center ">
            <div className="row">
                <div className="col-4"/>
                <div className="col-4">
                    <h1 className="mt-4">Hole {number}</h1>
                </div>
                <div className="col-4">
                    <button type="submit" className="btn btn-primary w-25 mt-4" onClick={addHole}>{parseInt(number) === course.holes ? "Finish" : "Next"}</button>
                </div>
            </div>

            <div className="row justify-content-around">
                <div className="mt-5">
                    <h4 htmlFor="exampleFormControlTeeBox">Mark Middle Of Green</h4>
                    <AddHoleMapContainer icon={faMapPin} pinColor={"#fff"} parentCallback = {greenData} />
                </div>
                <div className="mt-5">
                    <h4 htmlFor="exampleFormControlTeeBox">Mark Middle Of Fairway</h4>
                    <AddHoleMapContainer icon = {faCircleDot} pinColor={"#fff"} parentCallback = {fwData}/>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <ul className="nav nav-tabs w-75">
                    {
                        course.teeboxes.map((t,i)  => {
                            return(
                                <li className="nav-item">
                                    <a className={currentTab === i ? "nav-link active" : "nav-link"} data-bs-toggle="tab"  aria-current="page" onClick={() => setCurrentTab(i)}>{t.name}</a>
                                </li>
                                )
                        })
                    }
                </ul>
            </div>
            <div id="myTabContent" className="tab-content">
                <AddHoleForm teebox={currentTab} course = {course} hole={hole}/>
            </div>
        </div>
    );
}

export default AddHole;