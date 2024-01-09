import React, { useEffect, useState, } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { FaCalendar, FaWalking, FaArrowCircleUp, FaTrophy, FaUser, FaSchool, FaAddressCard } from 'react-icons/fa';
import { useParams, NavLink } from "react-router-dom";



const Coach = (props) => (
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
                        Hello my name is {props.coach.name}!
                    </h5>
                </div>
            </div>
            <div className="col-6 ">
                <h5>
                    <FaCalendar color="red" /> Age : {props.coach.age}
                </h5>
                <h5>
                    <FaWalking color="orange" /> Belt : {props.coach.belt}
                </h5>
                <h5>
                    <FaTrophy color="yellow" /> Achievements : {props.coach.achievement}
                </h5>
                <h5>
                    <FaArrowCircleUp color="green" /> Height : {props.coach.height}
                </h5>
                <h5>
                    <FaUser color="blue" /> About Me : {props.coach.aboutMe}
                </h5>
                <h5>
                    <FaAddressCard color="indigo" /> Title : {props.coach.title}
                </h5>
                <h5>
                    <FaSchool color="violet" /> School Matriculation Number : {props.coach.matriculation_number}
                </h5>
                <NavLink color="blue" href="#" to={`/EditCoach/${props.coach._id}`}>
                    Edit this member
                </NavLink>

            </div>

        </div>

    </div>
);



function SelectedCoach() {
    const [coach, setCoach] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        async function getCoach(id) {
            const response = await fetch(`http://localhost:5050/coaches/${id}`);
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const coach = await response.json();
            setCoach(coach);
        }
        getCoach(id);

        return;

    }, [id]);



    return (
        <div className="mt-5 mb-5">
            <Coach coach={coach} />

        </div>


    );
}

export default SelectedCoach;
