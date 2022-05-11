import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AddClubMapContainer from "../map/AddClubMapContainer";
import {IoIosCheckmark, IoIosTrash} from "react-icons/io";
import {Course, Hole} from "../../models/Course";
import AddHole from "./AddHole";
import {gql, useMutation, useLazyQuery} from "@apollo/client";

const SEND_COURSE = gql`
    mutation AddCourse($name: String!, $creator: String!, $description: String!, $location: LocationInput!, $holes: [HoleInput]!){
        addCourse(input: {name:$name, creator:$creator, description: $description, location: $location, holes: $holes}){
            name
        }
    
    }
    `
const COURSE = gql`
         query GetCourse($id: String!) {
            getCourse(id: $id) {
                id
                name
                creator
                description
                location {
                  lat
                  long
                }
                holes {
                  id
                  num
                  par
                  scoringIndex
                  locationMiddleOfGreen {
                    lat
                    long
                  }
                  locationTeebox {
                    lat
                    long
                  }
                }
              }     
           }`;

function AddCourse(props) {

    const {id} = useParams();

    // Form
    const [course, setCourse] = useState(new Course('',localStorage.getItem('Name'),18,'',null));
    const [holes, setHoles] = useState(18);
    const [desc, setDesc] = useState('')
    const [location, setLocation] = useState('');
    const [clubHouse, setClubHouse] = useState({
        lat:0,
        lng:0,
    })
    const [loaded, setLoaded] = useState(false);
    const [getCourse,{courseData}] = useLazyQuery(COURSE,{
        onCompleted: res => setCourse(res.getCourse),
    });

    const clubHouseData = (childData) => {
        course.setClubHouseLoc(childData);
    }

    const [addCourse, {loading,error,data}] = useMutation(SEND_COURSE,{
        onCompleted: res => {
            setCourse(new Course(res.getCourse.name,res.getCourse.creator, res.getCourse.holes, res.getCourse.description, res.getCourse.location));
            for (let i = 0; i < res.getCourse.holes; i++) {
                course.addHole(new Hole(res.getCourse.holes[i].num,res.getCourse.holes[i].par,res.getCourse.holes[i].scoringIndex,0,res.getCourse.holes[i].locationMidOfGreen,res.getCourse.holes[i].locationTeebox))
            }
            setLoaded(true);
        },
    });

    useEffect(() => {
        if (id) {
            getCourse({ variables: { id: id } })
        }
    },[])


    const addCourseQuery = () => {

        addCourse({
                variables: {
                    name: course.name,
                    creator: course.creator,
                    description: course.description,
                    location: {
                        lat: "" + course.clubHouseLocation.lat,
                        long: "" + course.clubHouseLocation.lng,
                    },
                    holes:
                        course.holesList.map(hole => {
                            return ({
                                num: parseInt(hole.num),
                                par: parseInt(hole.par),
                                scoringIndex: parseInt(hole.scoringIndex),
                                locationTeebox: {
                                    lat: "" + hole.locationTeebox.lat,
                                    long: "" + hole.locationTeebox.lng,
                                },
                                locationMiddleOfGreen: {
                                    lat: "" + hole.locationMidOfGreen.lat,
                                    long: "" + hole.locationMidOfGreen.lng,
                                },
                            })
                        }),
                }
            }).then(r => r);
            navigate('/home')
    }


    let navigate = useNavigate();
    const submitCourse = (e) => {
        e.preventDefault();
        console.log(course)
        if (course.clubHouseLocation.lng === 0 && course.clubHouseLocation.lng === 0) {
            return;
        }
        for (const hole of course.holesList) {
            if (!hole.isSaved) {
                return;
            }
        }
        addCourseQuery();
    }

    const changeHoles = (num) => {
        setHoles(num)
        course.setHoles(num)
    }

    return (

            !loaded ? null : <div className="d-flex justify-content-center h-100 ovh">
                <link rel="stylesheet" href={require('../login/Login.css')}/>
                <div className="d-flex flex-column w-100 justify-content-center ">
                    <form onKeyPress={event => {
                        if (event.key === 'Enter'){
                            event.preventDefault();
                        }
                    }
                    }>
                        <fieldset>

                            <div>
                                <div className="col-md-4 col-1"/>
                                <div className="form-group col-md-4 col-10 mx-auto">
                                    <h4 htmlFor={"course"} className="form-label mt-4">Course name</h4>
                                    <input type="text" className="form-control" id={"course"}
                                           placeholder="Enter course name..." onChange={e => course.setName(e.target.value)}/>
                                </div>
                                <div className="col-md-4 col-1"/>
                            </div>

                            <div className="row mt-5">
                                <div className="col-md-5 col-12">
                                    <div className="row">
                                        <div className="col-md-4 col-12 mt-2 justify-content-start mb-2">
                                            <h4 htmlFor="exampleFormControlHoles">Holes</h4>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                       id="9" checked={holes === 9} onChange={() => changeHoles(9)}/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    9
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input text-secondary" type="radio" name="flexRadioDefault"
                                                       id="18 " checked={holes === 18} onChange={() => changeHoles(18)}/>
                                                <label className="form-check-label " htmlFor="flexRadioDefault2">
                                                    18
                                                </label>
                                            </div>

                                        </div>
                                        <div className="col-md-8 col-12">
                                            <div className="form-group">
                                                <h4 htmlFor="exampleFormControlTextarea1">Description</h4>
                                                <textarea className="form-control" style={{resize: "none"}} id="exampleFormControlTextarea1" placeholder="Enter description..." rows="10" defaultValue={desc} onChange={e => course.setDescription(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <h4 htmlFor="exampleFormControlTeeBox" className="align-items-center">Mark Club House</h4>
                                    <div className="d-flex justify-content-center">
                                        <AddClubMapContainer className="align-items-center" parentCallback = {clubHouseData} />
                                    </div>
                                </div>
                            </div>

                            <AddHole course={course}/>

                            <button type="submit" className="btn btn-primary fixed-bottom mx-auto w-25 m-2" onClick={submitCourse}>Submit</button>

                        </fieldset>
                    </form>
                </div>
            </div>
    );
}

export default AddCourse;