import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function Login() {
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

    return (
        <>
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" placeholder="Enter your email address"/>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" placeholder="Enter your password"/>
                    </div>
                    <button type="button" onClick={login} class="btn btn-outline-secondary">Login</button>
                </div>
            </div>
        </div>

        <p>don't have any account? <Link to='/signup'>signup</Link></p>
        </>
    )
}

export default Login
