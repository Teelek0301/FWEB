import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./signup_page.css";

function SignUp() {
    const [form, setForm] = useState({
        name: "",
        password: "",
        matriculation_number: "",
    });
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

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

        await fetch("http://localhost:5050/taekwondo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        }).catch((error) => {
            window.alert(error);
            return;
        });

        setForm({ name: "", password: "", matriculation_number: "" });
        setPasswordError("");
        navigate("/SignUp");
    }

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

                <button type="submit" className="btn btn-primary form-btn">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
