import React, { useEffect, useState } from "react";
import { FaCalendar, FaWalking, FaArrowCircleUp, FaTrophy, FaUser, FaSchool, FaAddressCard } from 'react-icons/fa';
import { useParams, useNavigate } from "react-router-dom";



function EditMember() {
    const [member, setMember] = useState({
        name: "",
        age: "",
        belt: "",
        achievement: "",
        height: "",
        aboutMe: "",
        title: "",
        matriculation_number: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();



    function updateForm(value) {
        setMember((prev) => {
            return { ...prev, ...value };
        });
    }


    async function onSubmit(e) {
        e.preventDefault();
        const updatePerson = { ...member};

        // Use the correct endpoint for updating a specific member based on the ID
        await fetch(`http://localhost:5050/members/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatePerson),
        }).catch((error) => {
            window.alert(error);
            return;
        });



        // Redirect to the desired location
        navigate("/Members");
    }

    useEffect(() => {
        async function getMember(id) {
            const response = await fetch(`http://localhost:5050/members/${id}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const coachData = await response.json();
            setMember(coachData);
        }

        getMember(id);
    }, [id]);

    return (
        <div className="mt-5 mb-5">
            <form onSubmit={onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg"
                                alt="image"
                                width={300}
                                className="ms-4 rounded-circle"
                            />
                            <div>
                                <h5 className="mt-3">
                                    Hello my name is
                                    <input
                                        type="text"
                                        id="name"
                                        value={member.name}
                                        onChange={(e) => updateForm({ name: e.target.value })}
                                    />!
                                </h5>
                            </div>
                        </div>
                        <div className="col-6">
                            <h5>
                                <FaCalendar color="red" /> Age :{' '}
                                <input
                                    type="text"
                                    id="age"
                                    value={member.age}
                                    onChange={(e) => updateForm({ age: e.target.value })}
                                />
                            </h5>
                            <h5>
                                <FaWalking color="orange" /> Belt : {' '}
                                <input
                                    type="text"
                                    id="belt"
                                    value={member.belt}
                                    onChange={(e) => updateForm({ belt: e.target.value })}
                                />
                            </h5>
                            <h5>
                                <FaTrophy color="yellow" /> Achievements :{' '}
                                <input
                                    type="text"
                                    id="achievement"
                                    value={member.achievement}
                                    onChange={(e) => updateForm({ achievement: e.target.value })}
                                />
                            </h5>
                            <h5>
                                <FaArrowCircleUp color="green" /> Height : {' '}
                                <input
                                    type="text"
                                    id="height"
                                    value={member.height}
                                    onChange={(e) => updateForm({ height: e.target.value })}
                                />
                            </h5>
                            <h5>
                                <FaUser color="blue" /> About Me : {' '}
                                <input
                                    type="text"
                                    id="aboutMe"
                                    value={member.aboutMe}
                                    onChange={(e) => updateForm({ aboutMe: e.target.value })}
                                />
                            </h5>
                            <h5>
                                <FaAddressCard color="indigo" /> Title : {' '}
                                <input
                                    type="text"
                                    id="title"
                                    value={member.title}
                                    onChange={(e) => updateForm({ title: e.target.value })}
                                />
                            </h5>
                            <h5>
                                <FaSchool color="violet" /> School Matriculation Number : {' '}
                                <input
                                    type="text"
                                    id="matriculation_ number"
                                    value={member.matriculation_number}
                                    onChange={(e) => updateForm({ matriculation_number: e.target.value })}
                                />
                            </h5>
                            <button type="submit" className="btn btn-primary form-btn" value="Update User Info">
                                Update User Info
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditMember;
