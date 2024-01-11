import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { FaHeart, FaTrophy, FaStar } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import "./members_page.css"


const Coach = (props) => (
    <NavLink className="members text-dark text-decoration-none" to={`/SelectedCoach/${props.coach._id}`}>
        <section className=" text-center">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                alt="image"
                width={170}
                className="ms-4 rounded-circle"
            />
            <h5>{props.coach.name}</h5>
            <h6>{props.coach.title}, {props.coach.age}</h6>
        </section>
        
    </NavLink>
);

const Exco = (props) => (
    <NavLink className="members text-dark text-decoration-none" to={`/SelectedExco/${props.exco._id}`}>
        <section className=" text-center">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                alt="image"
                width={170}
                className="ms-4 rounded-circle"
            />
            <h5>{props.exco.name}</h5>
            <h6>{props.exco.title}, {props.exco.age}</h6>
        </section>
    </NavLink>
);

const Member = (props) => (
    <NavLink className="members text-dark text-decoration-none" to={`/SelectedMember/${props.member._id}`} >
        <section className=" text-center">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                alt="image"
                width={170}
                className="ms-4 rounded-circle"
            />
            <h5>{props.member.name}</h5>
            <h6>{props.member.title}, {props.member.age}</h6>
        </section>
    </NavLink>
);


function Members() {
    const [coaches, setCoaches] = useState([]);
    const [excos, setExcos] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function getCoaches() {
            const response = await fetch(`http://localhost:5050/coaches`);
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const coaches = await response.json();
            setCoaches(coaches);
        }



        async function getExcos() {
            const response = await fetch(`http://localhost:5050/excos`);
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const excos = await response.json();
            setExcos(excos);
        }



        async function getMembers() {
            const response = await fetch(`http://localhost:5050/members`);
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const members = await response.json();
            setMembers(members);
        }

        getCoaches();
        getExcos();
        getMembers();
        return;

    }, [coaches.length], [excos.length], [members.length]);


    function CoachList() {
        return coaches.map((coach) => {
            return (
                <Coach
                    coach={coach}
                    key={coach.id}

                />
            );
        });
    }

    function ExcoList() {
        return excos.map((exco) => {
            return (
                <Exco
                    exco={exco}
                    key={exco.id}

                />
            );
        });
    }


    function MemberList() {
        return members.map((member) => {
            return (
                <Member
                    member={member}
                    key={member.id}

                />
            );
        });
    }

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
                        {/* <button type="button" className="btn btn-outline-primary mb-3">Add Coach</button> */}
                    </div>
                    <div className="members-container">

                        {CoachList()}

                    </div>


                </div>
                <div>
                    <div className="ms-3">
                        <h3 className="text-decoration-underline">
                            Exco{' '}
                            <FaTrophy size={20} className="mb-1" color="yellow" />
                        </h3>
                        {/* <button type="button" className="btn btn-outline-primary mb-3">Add Exco</button> */}
                    </div>
                    <div className="members-container">

                        {ExcoList()}

                        
                    </div>
                </div>

                <div>
                    <div className="ms-3">
                        <h3 className="text-decoration-underline">
                            Members{' '}
                            <FaStar size={20} className="mb-1" color="yellow" />
                        </h3>
                        {/* <button type="button" className="btn btn-outline-primary mb-3">Add Member</button> */}
                    </div>
                    <div className="members-container">

                        {MemberList()}

                    </div>
                </div>
            </div>

        </div>


    );
}

export default Members;
