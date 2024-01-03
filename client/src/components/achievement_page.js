import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import { FaEdit } from 'react-icons/fa';
import { NavLink } from "react-router-dom";




function Achievement() {

    return (
        <div>
            <div className="container text-center mb-4">
                <h1>
                    <span className="Home">Achievements</span>
                </h1>

            </div>
            <div className="text-center mb-4">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                    alt="image"
                    width={400}
                    className="mx-auto d-block mb-4"
                />
                <div>
                    <h5>
                        Ben-dover takes the win for Temasek Polytechnice in the recent POLITE cometition held at Temasek Polytechnic
                    </h5>
                    <FaEdit />
                </div>
            </div>
        </div>


    );
}

export default Achievement;
