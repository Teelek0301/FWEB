import React, { useEffect, useState, }  from "react";

import "bootstrap/dist/css/bootstrap.css";
import { FaCalendar, FaWalking, FaArrowCircleUp,FaTrophy, FaUser, FaSchool, FaAddressCard  } from 'react-icons/fa';
import { useParams } from "react-router-dom";




const Exco = (props) => (
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
                        Hello my name is {props.exco.name}!
                    </h5>
                </div>
            </div>
            <div className="col-6 ">
                <h5>
                    <FaCalendar color="red" /> Age : {props.exco.age}
                </h5>
                <h5>
                    <FaWalking color="orange" /> Belt : {props.exco.belt}
                </h5>
                <h5>
                    <FaTrophy color="yellow" /> Achievements : {props.exco.achievement}
                </h5>
                <h5>
                    <FaArrowCircleUp color="green" /> Height : {props.exco.height}
                </h5>
                <h5>
                    <FaUser color="blue" /> About Me : {props.exco.aboutMe}
                </h5>
                <h5>
                    <FaAddressCard color="indigo" /> Title : {props.exco.title}
                </h5>
                <h5>
                    <FaSchool color="violet" /> School Matriculation Number : {props.exco.matriculation_number}
                </h5>

            </div>

        </div>

    </div>
);

function SelectedExco() {
    const [exco, setExco] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        async function getExco(id) {
            const response = await fetch(`http://localhost:5050/excos/${id}`);
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const exco = await response.json();
            setExco(exco);
        }
        getExco(id);

        return;

    }, [id]);

    return (
        <div className="mt-5 mb-5">
            <Exco exco={exco} />

        </div>


    );
}

export default SelectedExco;
