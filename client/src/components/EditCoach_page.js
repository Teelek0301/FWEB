import React, { useEffect, useState } from "react";
import { FaCalendar, FaWalking, FaArrowCircleUp, FaTrophy, FaUser, FaSchool, FaAddressCard } from 'react-icons/fa';
import { useParams, useNavigate } from "react-router-dom";

const Coach = (props) => (
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
                            value={props.coach.name}
                            onChange={(e) => props.updateForm({ name: e.target.value })}
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
                        value={props.coach.age}
                        onChange={(e) => props.updateForm({ age: e.target.value })}
                        />
                </h5>
                <h5>
                    <FaWalking color="orange" /> Belt : {' '}
                    <input
                            type="text"
                            id="belt"
                            value={props.coach.belt|| ""}
                            onChange={(e) => props.updateForm({ belt: e.target.value })}
                        />
                </h5>
                <h5>
                    <FaTrophy color="yellow" /> Achievements :{' '}
                    <input
                            type="text"
                            id="achievement"
                            value={props.coach.achievement|| ""}
                            onChange={(e) => props.updateForm({ achievement: e.target.value })}
                        />
                </h5>
                <h5>
                    <FaArrowCircleUp color="green" /> Height : {' '}
                    <input
                            type="text"
                            id="height"
                            value={props.coach.height|| ""}
                            onChange={(e) => props.updateForm({ height: e.target.value })}
                        />
                </h5>
                <h5>
                    <FaUser color="blue" /> About Me : {' '}
                    <input
                            type="text"
                            id="aboutMe"
                            value={props.coach.aboutMe|| ""}
                            onChange={(e) => props.updateForm({ aboutMe: e.target.value })}
                        />
                </h5>
                <h5>
                    <FaAddressCard color="indigo" /> Title : {' '}
                    <input
                            type="text"
                            id="title"
                            value={props.coach.title|| ""}
                            onChange={(e) => props.updateForm({ title: e.target.value })}
                        />
                </h5>
                <h5>
                    <FaSchool color="violet" /> School Matriculation Number : {' '}
                    <input
                            type="text"
                            id="matriculationNumber"
                            value={props.coach.matriculationNumber|| ""}
                            onChange={(e) => props.updateForm({ matriculationNumber: e.target.value })}
                        />
                </h5>
                <button type="submit" className="btn btn-primary form-btn">
                    Update User Info
                </button>
            </div>
        </div>
    </div>
);

function EditCoach(props) {
    const [coach, setCoach] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
    });

    function updateForm(value) {
        setForm((prev) => {
          return { ...prev, ...value };
        });
      }
      

    async function onSubmit(e) {
        e.preventDefault();
        const updatePerson = { ...form };

        // Use the correct endpoint for updating a specific coach based on the ID
        await fetch(`http://localhost:5050/coaches/${id}`, {
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
        async function getCoach(id) {
            const response = await fetch(`http://localhost:5050/coaches/${id}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const coachData = await response.json();
            setCoach(coachData);
        }

        getCoach(id);
    }, [id]);

    return (
        <div className="mt-5 mb-5">
            <form onSubmit={onSubmit}>
                <Coach coach={coach}  updateForm={updateForm}/>
            </form>
        </div>
    );
}

export default EditCoach;
