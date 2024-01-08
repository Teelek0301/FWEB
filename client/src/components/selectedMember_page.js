import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import { FaCalendar, FaWalking, FaArrowCircleUp,FaTrophy, FaUser  } from 'react-icons/fa';
import { NavLink } from "react-router-dom";




function SelectedMember() {

    return (
        <div className="mt-5 mb-5">
            <div className="container">
                <div className="row ">
                    <div className="col text-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                            alt="image"
                            width={300}
                            className="ms-4 rounded-circle"
                           
                        />
                        <div>
                            <h5 className="mt-3">
                                Hello my name is ben-dover!
                            </h5>
                        </div>
                    </div>
                    <div className="col-6 ">
                        <h5>
                            <FaCalendar color="orange"/> Age: 17
                        </h5>
                        <h5>
                            <FaWalking/> Belt: Black 
                        </h5>
                        <h5>
                            <FaArrowCircleUp color="blue"/> Height: 185CM 
                        </h5>
                        <h5>
                            <FaTrophy color="yellow"/> Achievements: SEA Games Gold medalist 
                        </h5>
                        <h5>
                            <FaUser color="red"/> About Me: Hi I am Ben-dover, I like chinese food
                        </h5>

                    </div>

                </div>

            </div>

        </div>


    );
}

export default SelectedMember;
