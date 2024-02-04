import { useEffect, useState } from 'react'
import './login.css';
import "bootstrap/dist/css/bootstrap.css";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import speakeasy from "speakeasy";


function App() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [code,setCode] = useState('')
    let twoFa = false;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const member = token;
            if (!member) {
                localStorage.removeItem('token');
                window.location.href = '/Login';
            } else {
                if (sessionStorage.getItem('coach_id')) {
                    let coach_id = sessionStorage.getItem('coach_id');
                    window.location.href = `/selectedCoach/${coach_id}`;
                } else if (sessionStorage.getItem('exco_id')) {
                    let exco_id = sessionStorage.getItem('exco_id');
                    window.location.href = `/selectedExco/${exco_id}`;
                } else if (sessionStorage.getItem('member_id')) {
                    let member_id = sessionStorage.getItem('member_id');
                    window.location.href = `/selectedMember/${member_id}`;
                }
            }
        }
    }, [])

    async function loginMember(event) {
        event.preventDefault()

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
        console.log(selectedMemberTypes);
        if (selectedMemberTypes[0] === "Coach") {

            console.log('Coach fetch')
            const response = await fetch('http://localhost:5050/coaches/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            })

            const data = await response.json()
            console.log(data)

            if (data.coach) {
                localStorage.setItem('token', data.coach)
                sessionStorage.setItem('coach_id', data._id);
                alert('Login successful')
                window.location.href = '/Members'
            } else {
                alert('Please check your username and password')
            }
        } else if (selectedMemberTypes[0] == "Exco") {
            const response = await fetch('http://localhost:5050/excos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            })

            const data = await response.json()

            if (data.exco) {
                localStorage.setItem('token', data.exco)
                sessionStorage.setItem('exco_id', data._id);
                alert('Login successful')
                window.location.href = '/Members'
            } else {
                alert('Please check your username and password')
            }
        } else if (selectedMemberTypes[0] == "Member") {
            const response = await fetch('http://localhost:5050/members/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            })

            const data = await response.json()

            if (data.member) {
                localStorage.setItem('token', data.member);
                sessionStorage.setItem('member_id', data._id, 'secret', data.secret, 'qr', data.qr);
                alert('Please input 6 digit code on ur google authenticator app');
                twoFa = true;
            } else {
                alert('Please check your username and password')
            }


        }
    }

    async function checkTwoFa(event) {
        event.preventDefault();
         let secret = sessionStorage.getItem('secret');
        var verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: code

        });
        if (verified) {
            alert('Login successful')
            window.location.href = '/Members'
        } else {
            alert('Please check your 6 digit code')
        };
    };

    if (twoFa) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
                <form className='form-container' onSubmit={checkTwoFa}>
                    <div className='mb-3 form-style'>
                        <label htmlFor="sixDigit" className="form-label">
                            Name
                        </label>
                        <input
                            value={""}
                            onChange={(e) => setCode(e.target.value)}
                            type="text"
                            placeholder="Six Digit Code"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary form-btn">
                        Submit
                    </button>


                </form>

            </div>
        )
    } else {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
                <form className='form-container' onSubmit={loginMember}>
                    <div className='mb-3 form-style'>
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name"
                        />
                    </div>

                    <br />

                    <div className='mb-3 form-style'>
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                    </div>

                    <br />

                    <div id="Member_type" className="mb-3">
                        <h6 className="text-center">
                            Member Type
                        </h6>
                        <div className="mb-3 form-check">
                            <input type="radio" name="memberType" className="form-check-input" id="Coach" />
                            <label className="form-check-label" htmlFor="Coach">Coach</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="radio" name="memberType" className="form-check-input" id="Exco" />
                            <label className="form-check-label" htmlFor="Exco">Exco</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="radio" name="memberType" className="form-check-input" id="Members" />
                            <label className="form-check-label" htmlFor="Members">Member</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary form-btn">
                        Login
                    </button>

                    <div className='mt-5 text-center'>
                        Not a Member?{' '}
                        <a href="/SignUp">Sign Up</a>
                    </div>


                </form>

            </div>
        )
    }


}

export default App