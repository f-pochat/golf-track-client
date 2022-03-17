import React from 'react';
import Navbar from "./Navbar";
import {IoIosCreate, IoIosTrash} from "react-icons/io";


function Home() {
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
    ]
    return (
        <div>
            <Navbar/>
            <div>
                {
                    // eslint-disable-next-line array-callback-return
                    courses.map((course) => {
                        return(
                            <div className="card text-white bg-info m-3 ">
                                <div className="card-body">
                                    <div className="d-flex flex-row">
                                        <div className="col-3">
                                            <h4 className="text-dark pt-2">{course.name}</h4>
                                        </div>
                                        <div className="col-3"/>
                                        <div className="col-3"/>
                                        <div className="col-3">
                                            <a href={`/edit/${course.id}`}><IoIosCreate className="text-dark" size={40}/></a> <a href={`/delete/${course.id}`}><IoIosTrash style={{'color':'red'}} size={40}/></a>
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