import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FaCalendar, FaWalking, FaArrowCircleUp, FaTrophy, FaUser, FaSchool, FaAddressCard } from 'react-icons/fa';
import { useParams, NavLink, useNavigate } from "react-router-dom";

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
            </div>
        </div>
    </div>
);

const CoachAdmin = (props) => (
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
                    <button type="button" className="btn btn-danger" onClick={() => {
                        props.deleteCoach(props.coach._id)
                    }}>Delete Member</button>
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
                <h5>
                    <NavLink color="blue" href="#" to={`/EditCoach/${props.coach._id}`}>
                        Edit this member
                    </NavLink>
                </h5>

                <h5>
                    <a href="#" onClick={() => { props.logout() }}>Log Out</a>
                </h5>

            </div>

        </div>
    </div>
);

function SelectedCoach() {
    const [coach, setCoach] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getCoach(id) {
            const response = await fetch(`http://localhost:5050/coaches/${id}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const coach = await response.json();
            setCoach(coach);
        }
        getCoach(id);

        return;
    }, [id]);

    async function deleteCoach(id) {
        const confirmDeletion = window.confirm("Are you sure you want to delete this member?");
        if (!confirmDeletion) {
            return;
        }
        await fetch(`http://localhost:5050/coaches/${id}`, {
            method: "DELETE",
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        });

        logout();
    }

    function logout() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('coach_id');
        window.location.href = '/Login';
    }

    const token = localStorage.getItem('token');
    if (token) {
        const member = token;
        if (member) {
            if (sessionStorage.getItem('coach_id') == coach._id) {
                return (
                    <div className="mt-5 mb-5">
                        <CoachAdmin coach={coach} deleteCoach={() => deleteCoach(coach._id)} logout={() => logout()} />
                    </div>
                );
            } else {
                return (
                    <div className="mt-5 mb-5">
                        <Coach coach={coach} />
                    </div>
                );
            }
        } else {
            return (
                <div className="mt-5 mb-5">
                    <Coach coach={coach} />
                </div>
            );
        }
    }else {
        return (
            <div className="mt-5 mb-5">
                <Coach coach={coach} />
            </div>
        );
    }
}

export default SelectedCoach;
