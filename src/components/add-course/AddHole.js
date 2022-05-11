import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AddHoleForm from "./AddHoleForm";
import './AddHole.css';
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

    const course = props.course;

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
        console.log(course);
    }

    return (
        <div>
            <div className="d-flex flex-column mt-5">
                <div className="row justify-content-center">
                    {
                        course.holesList.map(h => {
                            return <button type="button" className={h.isSaved ? "btn btn-success m-2 rounded" : "btn btn-danger m-2 rounded"} onClick={() => {console.log(course);openModal(h.num)}}>{h.num}</button>
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