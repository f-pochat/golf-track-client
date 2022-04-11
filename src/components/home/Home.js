import React, {useEffect, useState} from 'react';
import Navbar from "../utils/Navbar";
import {IoIosSearch, IoIosTrash} from "react-icons/io";
import Modal from 'react-modal';
import './Home.css';
import {gql, useLazyQuery, useMutation} from '@apollo/client';

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


function Home(props) {

    const COURSES = gql`
         query GetCourses {
            getCourses{
                id
                name
                creator 
           }         
  }`;
    const DELETE_COURSE = gql`
        mutation DeleteCourse($id:String){
            deleteCourse(id:$id)
         }

`

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);
    const [courseList, setCourses] = useState([]);

    //const [courseList, setCourses] = useState([]);
    const [getCourseList, {loading,  data}] = useLazyQuery(COURSES,
        {
            onCompleted: res => setCourses(res.getCourses),
        });

    useEffect(() => {
        getCourseList().then(r => r);
    },[])

    const [deleteCourse] = useMutation(DELETE_COURSE)

    if (loading) return(<span>Loading...</span>)

    function openModal(id) {
        setIsOpen(true);
        setId(id)
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f22';
    }

    function closeModal() {
        setIsOpen(false);
    }


    const popCourse = async () => {
        await deleteCourse({
            variables:{
                id:id,
            }
        })
        getCourseList();
        closeModal();

    }

    const searchCourses = (val) => {

        let aux = data.getCourses.filter(course => {
            return course.name.toLowerCase().includes(val.toLowerCase());
        })

        setCourses(aux)
    }

    return (
        <div>
            <Navbar user={props.user}/>
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
                    <button className="btn btn-danger m-3" onClick={popCourse}>Delete</button>
                </div>
            </Modal>
            <div>
                <div className="input-group mt-2 w-75 mx-auto">
                    <input type="text" className="form-control"
                           placeholder="Search..." onChange={e => searchCourses(e.target.value)}/>
                    <span className="input-group-append ml-2">
                        <IoIosSearch className="mt-2" size={30} />
                    </span>
                </div>
            </div>
            <div>
                {
                    // eslint-disable-next-line array-callback-return
                    courseList.map((course) => {
                        return (
                            <div className="card text-white bg-primary m-3 " key={course.id}>
                                <div className="card-body">
                                    <div className="d-flex flex-row">
                                        <div className="p-0 col-md-7 col-7">
                                            <h4 className="text-light pt-2 break-word">{course.name}</h4>
                                        </div>
                                        <div className="col-md-5 col-5">
                                            {
                                                (localStorage.getItem('Name') === course.creator || localStorage.getItem('Role') === 'Admin') ?
                                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                                    <a href="#" onClick={() => openModal(course.id)}><IoIosTrash
                                                        className="text-danger" size={40}/></a>
                                                    : null
                                            }

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