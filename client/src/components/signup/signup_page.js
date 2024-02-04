import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./signup_page.css";

function SignUp() {
    const [form, setForm] = useState({
        name: "",
        password: "",
        matriculation_number: "",
        title: "",
        age: "",
    });
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    let qr = false;
    let qrCode = ""; // Define qrCode variable

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function validatePassword(password) {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (
            password.length >= minLength &&
            hasUppercase &&
            hasLowercase &&
            hasSpecialCharacter
        ) {
            return true;
        } else {
            return false;
        }
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (!validatePassword(form.password)) {
            setPasswordError(
                "Password must be 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character."
            );
            return;
        }

        const newPerson = { ...form };

        let selectedMemberTypes = [];

        if (document.getElementById("Coach").checked) {
            selectedMemberTypes.push("Coach");
        }
        if (document.getElementById("Exco").checked) {
            selectedMemberTypes.push("Exco");
        }
        if (document.getElementById("Members").checked) {
            selectedMemberTypes.push("Member");
        }

        // Check if more than one member type is selected
        if (selectedMemberTypes.length > 1) {
            window.alert("Please select only one member type");
            selectedMemberTypes = [];
            console.log(selectedMemberTypes);
            return;
        }

        // Check if no member type is selected
        if (selectedMemberTypes.length === 0) {
            window.alert("Please select at least one member type");
            selectedMemberTypes = [];
            console.log(selectedMemberTypes);
            return;
        }

        if (selectedMemberTypes[0] == "Coach") {
            const response = await fetch("http://localhost:5050/coaches", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            }).catch((error) => {
                window.alert(error);
                return;
            });
            const data = await response.json();
            qrCode = data.qr; // Assign qrCode value
        } else if (selectedMemberTypes[0] == "Exco") {
            const response = await fetch("http://localhost:5050/excos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            }).catch((error) => {
                window.alert(error);
                return;
            });
            const data = await response.json();
            qrCode = data.qr; // Assign qrCode value
        } else if (selectedMemberTypes[0] == "Member") {
            const response = await fetch("http://localhost:5050/members", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            }).catch((error) => {
                window.alert(error);
                return;
            });
            const data = await response.json();
            qrCode = data.qr; // Assign qrCode value
        }

        setForm({ name: "", password: "", matriculation_number: "", title: "", age: "" });
        setPasswordError("");
        qr = true;
    }

    if (qr) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <div>
                    <h1>QR Code</h1>
                    <img src={qrCode} alt="qr" />
                    <h2>Warning, Please scan QR code with google authenticator as it will only be shown Once</h2>
                    <h5>
                        <a href="/Login">Back to Login</a>
                    </h5>
                </div>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <form className="form-container" onSubmit={onSubmit}>
                    <div className="mb-3 form-style">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={form.name}
                            onChange={(e) => updateForm({ name: e.target.value })}
                        />
                        <div className="form-text">
                            Your full name as in your matriculation card
                        </div>
                    </div>
                    <div className="mb-3 form-style">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                        <div className="form-text" style={{ color: 'red' }}>{passwordError}</div>
                    </div>
                    <div className="mb-3 form-style">
                        <label htmlFor="matriculation_number" className="form-label">
                            Matriculation Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="matriculation_number"
                            value={form.matriculation_number}
                            onChange={(e) =>
                                updateForm({ matriculation_number: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3 form-style">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={form.title}
                            onChange={(e) =>
                                updateForm({ title: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3 form-style">
                        <label htmlFor="age" className="form-label">
                            Age
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            value={form.age}
                            onChange={(e) =>
                                updateForm({ age: e.target.value })
                            }
                        />
                    </div>
                    <div id="Member_type" className="mb-3">
                        <h6 className="text-center">
                            Member Type
                        </h6>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="Coach" />
                            <label className="form-check-label" htmlFor="coach">Coach</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="Exco" />
                            <label className="form-check-label" htmlFor="exco">Exco</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="Members" />
                            <label className="form-check-label" htmlFor="member">Member</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary form-btn">
                        Sign Up
                    </button>
                </form>
            </div>
        );
    }
}

export default SignUp;
