import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import { FaHeart, FaTrophy, FaStar, FaEdit } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import "./members_page.css"




function Members() {

    return (
        <div>
            <div className="container text-center mb-4">
                <h1>
                    <span className="Home">Members</span>
                </h1>

            </div>
            <div>
                <div>
                    <div className="ms-3">
                        <h3 className="text-decoration-underline">
                            Coaches{' '}
                            <FaHeart size={20} className="mb-1" color="red" />
                        </h3>
                    </div>
                    <div className="members-container">
                        <div className="members">
                            <div>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                                    alt="image"
                                    width={170}
                                    className="ms-4 rounded-circle"
                                />
                            </div>

                            <div className="memberText">
                                <h5>Micheal Sir <FaEdit /></h5>
                                <h6>Grandmaster, 56</h6>
                            </div>
                        </div>
                        <div className="members">
                            <div>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                                    alt="image"
                                    width={170}
                                    className="ms-4 rounded-circle"
                                />
                            </div>

                            <div className="memberText">
                                <h5>Micheal Sir <FaEdit /> </h5>
                                <h6>Grandmaster, 56</h6>
                            </div>
                        </div>
                    </div>


                </div>
                <div>
                    <div className="ms-3">
                        <h3 className="text-decoration-underline">
                            Exco{' '}
                            <FaTrophy size={20} className="mb-1" color="yellow" />
                        </h3>
                    </div>
                    <div className="members-container">
                        <div className="members">
                            <div>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                                    alt="image"
                                    width={170}
                                    className="ms-4 rounded-circle"
                                />
                            </div>

                            <div className="memberText">
                                <h5>Micheal Sir <FaEdit /> </h5>
                                <h6>Grandmaster, 56</h6>
                            </div>
                        </div>
                        <div className="members">
                            <div>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                                    alt="image"
                                    width={170}
                                    className="ms-4 rounded-circle"
                                />
                            </div>

                            <div className="memberText">
                                <h5>Micheal Sir <FaEdit /> </h5>
                                <h6>Grandmaster, 56</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="ms-3">
                        <h3 className="text-decoration-underline">
                            Members{' '}
                            <FaStar size={20} className="mb-1" color="yellow" />
                        </h3>
                    </div>
                    <div className="members-container">
                        <div className="members">
                            <div>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                                    alt="image"
                                    width={170}
                                    className="ms-4 rounded-circle"
                                />
                            </div>

                            <div className="memberText">
                                <h5>Micheal Sir <FaEdit /> </h5>
                                <h6>Grandmaster, 56</h6>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>


    );
}

export default Members;
