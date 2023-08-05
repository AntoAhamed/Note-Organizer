import React from 'react'
import { Outlet, Link } from "react-router-dom";

function Navbar(props) {
    function logout(e) {
        e.preventDefault();

        props.setUser({});
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/add_note">NoteOrganizer</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/add_note">Add Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/your_notes">Your Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add_category">Add Categories</Link>
                            </li>
                        </ul>
                        <button onClick={logout} disabled={!props.user?._id} className="btn btn-outline-light d-flex">Logout</button>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>

    )
}

export default Navbar
