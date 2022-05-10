import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AddHoleForm from "./AddHoleForm";
import {AddHoleMapContainer} from "../map/AddHoleMapContainer";
import {faCircleDot, faMapPin} from "@fortawesome/free-solid-svg-icons";
import './AddHole.css';
import {Hole} from "../../models/Hole";
import {gql, useMutation} from "@apollo/client";
import Modal from "react-modal";
import {animations} from 'react-animation';

const customStyles = {
    content: {
        animation: animations.popIn,
        margin:'auto',
        height: '80%',
        width:'90%',
        padding:'0px',
        inset: 0,
    },
};

const AddHole = (props) => {

    const SEND_COURSE = gql`
    mutation AddCourse($name: String!, $creator: String!, $description: String!, $location: LocationInput!, $holes: [HoleInput]!){
        addCourse(input: {name:$name, creator:$creator, description: $description, location: $location, holes: $holes}){
            name
        }
    
    }
    `

    const course = props.course;
    const {number} = useParams();
    const holes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

    const addedHole = useRef();

    const [addCourse, {loading,error,data}] = useMutation(SEND_COURSE,{
        onCompleted: res => console.log(res),
    });

    const navigate = useNavigate();

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedHole, setHole] = useState(0);
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

    function openModal(hole) {
        setHole(hole)
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f22';
    }

    function closeModal() {
        setIsOpen(false);
    }


    const addHole = () => {
        course.addHole(hole);

        if (parseInt(number) === course.holes){
            addCourse({
                variables: {
                    name: course.name,
                    creator: course.creator,
                    description: course.description,
                    location: {
                        lat: ""+course.clubHouseLocation.lat,
                        long: ""+course.clubHouseLocation.lng,
                    },
                    holes:
                        course.holesList.map(hole => {
                            return({
                                num:parseInt(hole.num),
                                locationMiddleOfGreen: {
                                    lat:""+hole.locationMidOfGreen.lat,
                                    long:""+hole.locationMidOfGreen.lng,
                                },
                                locationMiddleOfFW: {
                                    lat:""+hole.locationMidOfFw.lat,
                                    long:""+hole.locationMidOfFw.lng,
                                },
                                teeboxes:
                                    hole.teebox.map(t => {
                                    return({
                                        name:t.name,
                                        color:t.color,
                                        par: t.par,
                                        scoringIndex: t.scoringIndex,
                                        locationTeeBox: {
                                            lat:""+t.locationTeeBox.lat,
                                            long:""+t.locationTeeBox.lng,
                                        }
                                    })
                                })
                            })
                        })

                    ,
                }
            }).then(r => r);
            navigate('/home')
        }else{
            addedHole.current.refresh();
            let path = '/addCourse/' + (parseInt(number)+1);
            navigate(path);
        }

    }

    return (
        <div>
            <div className="d-flex flex-column mt-5">
                <div className="row justify-content-center">
                    {
                        holes.map(h => {
                            return <button type="button" className="btn btn-danger m-2 rounded" onClick={() => openModal(h)}>{h}</button>
                        })
                    }

                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AddHoleForm course={course} closeModal={closeModal} hole={selectedHole}/>
            </Modal>
        </div>

    );
}

export default AddHole;