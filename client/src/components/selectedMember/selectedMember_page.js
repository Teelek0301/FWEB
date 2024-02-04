import React, { useEffect, useState, } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { FaCalendar, FaWalking, FaArrowCircleUp, FaTrophy, FaUser, FaSchool, FaAddressCard } from 'react-icons/fa';
import { useParams, NavLink, useNavigate } from "react-router-dom";





const Member = (props) => (
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
                        Hello my name is {props.member.name}!
                    </h5>
                </div>
            </div>
            <div className="col-6 ">
                <h5>
                    <FaCalendar color="red" /> Age : {props.member.age}
                </h5>
                <h5>
                    <FaWalking color="orange" /> Belt : {props.member.belt}
                </h5>
                <h5>
                    <FaTrophy color="yellow" /> Achievements : {props.member.achievement}
                </h5>
                <h5>
                    <FaArrowCircleUp color="green" /> Height : {props.member.height}
                </h5>
                <h5>
                    <FaUser color="blue" /> About Me : {props.member.aboutMe}
                </h5>
                <h5>
                    <FaAddressCard color="indigo" /> Title : {props.member.title}
                </h5>
                <h5>
                    <FaSchool color="violet" /> School Matriculation Number : {props.member.matriculation_number}
                </h5>


            </div>

        </div>

    </div>
);

const MemberAdmin = (props) => (
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
                        Hello my name is {props.member.name}!
                    </h5>
                    <button type="button" class="btn btn-danger" onClick={() => {
                        props.deleteMember(props.member._id);
                    }}>Delete Member</button>
                </div>
            </div>
            <div className="col-6 ">
                <h5>
                    <FaCalendar color="red" /> Age : {props.member.age}
                </h5>
                <h5>
                    <FaWalking color="orange" /> Belt : {props.member.belt}
                </h5>
                <h5>
                    <FaTrophy color="yellow" /> Achievements : {props.member.achievement}
                </h5>
                <h5>
                    <FaArrowCircleUp color="green" /> Height : {props.member.height}
                </h5>
                <h5>
                    <FaUser color="blue" /> About Me : {props.member.aboutMe}
                </h5>
                <h5>
                    <FaAddressCard color="indigo" /> Title : {props.member.title}
                </h5>
                <h5>
                    <FaSchool color="violet" /> School Matriculation Number : {props.member.matriculation_number}
                </h5>
                <h5>
                    <NavLink color="blue" href="#" to={`/EditMember/${props.member._id}`}>
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

function SelectedMember() {
    const [member, setMember] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        async function getMember(id) {
            const response = await fetch(`http://localhost:5050/members/${id}`);
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const member = await response.json();
            setMember(member);
        }
        getMember(id);

        return;

    }, [id]);

    async function deleteMember(id) {
        const confirmDeletion = window.confirm("Are you sure you want to delete this member?");
        if (!confirmDeletion) {
            return;
        }
        await fetch(`http://localhost:5050/members/${id}`, {
            method: "DELETE",
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        });

        logout();

    }

    function logout() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('member_id');
        window.location.href = '/Login';
    }

    const token = localStorage.getItem('token');
    if (token) {
        const members = token;
        if (members) {
            if (sessionStorage.getItem('member_id') == member._id) {
                console.log(1);
                return (
                    <div className="mt-5 mb-5">
                        <MemberAdmin member={member} deleteMember={() => deleteMember(member._id)} logout={() => logout()} />
                    </div>
                );
            } else {
                console.log(12);
                console.log(member);
                return (
                    <div className="mt-5 mb-5">
                        <Member member={member} />
                    </div>
                );
            }
        } else {
            console.log(13);
            return (
                <div className="mt-5 mb-5">
                    <Member member={member} />

                </div>


            );
        }
    }else {
        console.log(14);
        return (
            <div className="mt-5 mb-5">
                <Member member={member} />

            </div>


        );
    }
}

export default SelectedMember;
