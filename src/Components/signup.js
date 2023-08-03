import React from 'react'
import { Link } from "react-router-dom";

function signup() {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter your name" />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter your email address" />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter your password" />
                        </div>
                    </div>
                </div>
            </div>

            <p>already have an account? <Link to='/'>login</Link></p>
        </>
    )
}

export default signup
