import React, {useState} from 'react';
import Navbar from "./Navbar";
import {IoIosCreate, IoIosTrash} from "react-icons/io";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function Home() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0)

    function openModal(id) {
        setIsOpen(true);
        setId(id)
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const courses = [
        {
            name:'Pacheco Golf',
            id: '1'
        },
        {
            name:'Salta Golf',
            id: '2'
        },
        {
            name:'Buenos Aires Golf',
            id: '3'
        },
        {
            name:'Potrerillo de Larreta',
            id: '4'
        },
        {
            name:'Nordelta Golf Club',
            id: '5'
        },
    ]

    function deleteCourse() {
        console.log("Delete" + id);
        closeModal();
    }

    return (
        <div>
            <Navbar/>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2> Are you sure you want to delete this course?</h2>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary m-3" onClick={closeModal}>Cancel</button>
                    <button className="btn btn-danger m-3" onClick={deleteCourse}>Delete</button>
                </div>
            </Modal>
            <div>
                {
                    // eslint-disable-next-line array-callback-return
                    courses.map((course) => {
                        return(
                            <div className="card text-white bg-primary m-3 ">
                                <div className="card-body">
                                    <div className="d-flex flex-row">
                                        <div className="col-3">
                                            <h4 className="text-light pt-2">{course.name}</h4>
                                        </div>
                                        <div className="col-3"/>
                                        <div className="col-3"/>
                                        <div className="col-3">
                                            <a href={`/edit/${course.id}`}><IoIosCreate className="text-light" size={40}/></a> <a href="#" onClick={() => openModal(course.id)}><IoIosTrash className="text-danger ml-3" size={40}/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                    })
                }
            </div>
        </div>
    );
}

export default Home;