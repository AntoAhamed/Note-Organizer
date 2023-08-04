import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function signup(e) {
        e.preventDefault();

        if (name !== '' && email !== '' && password !== '') {
            try {
                await axios.post('http://localhost:8000/signup', { name, email, password })
                    .then(res => {
                        if (res.data === "failed") {
                            alert("User already exist!");
                        }
                        else {
                            alert("You are signed up successfully");
                            navigate("/");
                        }
                    }).catch(e => {
                        console.log(e);
                    });
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert("Empty field can't be submitted!");
        }
    }

    return (
        <>
            <div className='container'>
                <div className="col" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
                    <b>Signup Here</b>
                </div>
                <div className='row'>
                    <div className='col'>
                        <form action='' method='post' className='signup-form'>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} id="name" placeholder="Enter your name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" placeholder="Enter your email address" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" placeholder="Enter your password" />
                            </div>
                            <button type="submit" onClick={signup} className="btn btn-outline-dark">Signup</button>
                        </form>
                    </div>
                </div>
                <p className='signup-para'>already have an account? <Link to='/'>login</Link></p>
            </div>
        </>
    )
}

export default Signup
