import React, {useState} from 'react';
import { useParams} from "react-router-dom";
import AddHoleForm from "./AddHoleForm";
import MapContainer from "./map/AddClubMapContainer";
import {AddHoleMapContainer} from "./map/AddHoleMapContainer";
import {faCircleDot, faMapPin} from "@fortawesome/free-solid-svg-icons";

const AddHole = (props) => {
    const teeboxes = props.teeboxes;
    const {number} = useParams();
    const [currentTab, setCurrentTab] = useState("");

    return (
        <div className="d-flex flex-column w-100 justify-content-center ">
            <h1 className="mt-4">Hole {number}</h1>
            <div className="row justify-content-around">
                <div className="mt-5">
                    <h4 htmlFor="exampleFormControlTeeBox">Mark Middle Of Green</h4>
                    <AddHoleMapContainer icon={faMapPin}/>
                </div>
                <div className="mt-5">
                    <h4 htmlFor="exampleFormControlTeeBox">Mark Middle Of Fairway</h4>
                    <AddHoleMapContainer icon = {faCircleDot}/>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <ul className="nav nav-tabs w-75">
                    {
                        teeboxes.map(t => {
                            return(
                                <li className="nav-item">
                                    <a className={currentTab === t ? "nav-link active" : "nav-link"} data-bs-toggle="tab"  aria-current="page" onClick={() => setCurrentTab(t)}>{t}</a>
                                </li>
                                )
                        })
                    }
                </ul>
            </div>
            <div id="myTabContent" className="tab-content">
                <AddHoleForm teebox={currentTab}/>
            </div>
        </div>
    );
}

export default AddHole;