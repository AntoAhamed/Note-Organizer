import React, {useState} from 'react'
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
                <div className='row'>
                    <div className='col'>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} id="name" placeholder="Enter your name" />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" placeholder="Enter your email address" />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" placeholder="Enter your password" />
                        </div>
                        <button type="button" onClick={signup} class="btn btn-outline-secondary">Signup</button>
                    </div>
                </div>
            </div>

            <p>already have an account? <Link to='/'>login</Link></p>
        </>
    )
}

export default Signup
