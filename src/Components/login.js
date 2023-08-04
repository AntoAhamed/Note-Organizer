import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function login(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            try {
                await axios.post('http://localhost:8000/login', { email, password })
                    .then(res => {
                        if (res.data === "failed") {
                            alert("User dose not exist!");
                        }
                        else {
                            getData();
                            alert("You are loged in successfully");
                            navigate("/add_note");
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

    function getData() {
        axios.get("http://localhost:8000/get_user")
            .then(res => {
                const data = res.data;
                console.log("Data has been received successfully");
                props.setUser(data.user);
                console.log(data);
            }).catch(e => {
                console.log("Data retrive unsuccessfull");
                console.log(e);
            })
    }

    return (
        <>
            <div className='container'>
                <div className="row mb-3">
                    <div className="col" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
                        <b>Login Here</b>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <form action='' method='post' className='login-form'>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" placeholder="Enter your email address" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" placeholder="Enter your password" />
                            </div>
                            <button type="submit" onClick={login} className="btn btn-outline-dark">Login</button>
                        </form>
                    </div>
                </div>
                <p className='login-para'>don't have any account? <Link to='/signup'>signup</Link></p>
            </div>
        </>
    )
}

export default Login
