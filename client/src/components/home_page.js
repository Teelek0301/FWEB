import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import "./home_page.css";



function Home() {

    return (
        <div className="container text-center">
            <h1 className="d-flex justify-content-between">
                <span className="Home">Announcements</span>
                <span className="Home">Recently</span>
            </h1>
            <div className="d-flex align-items-start">
                <div className="mx-auto">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                        alt="image"
                        width={400}
                    />
                </div>
                <div className="d-flex flex-column align-items-center mx-auto">
                    <h5>
                        Hi everyone, there will be training next Tuesday 14/11. Do come by
                        6.30pm and training will be held at the sports complex
                    </h5>
                </div>
            </div>
        </div>

    );
}

export default Home;
