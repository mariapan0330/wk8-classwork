import React from 'react'
import { Link } from 'react-router-dom'
// use rfc and ->tab as shortcut 

export default function navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
                {props.loggedIn ? <>Welcome back, {props.username}</> : <>Hi Stranger!</>}
                </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className='nav-link active' to="/">Home</Link>
                    <Link className='nav-link active' to="/standings">Standings</Link>
                    {props.loggedIn ? 
                        <>
                            <Link className='nav-link active' to="/create-post">Create Post</Link>
                            <Link className='nav-link active' to="/" onClick={props.logout}>Log Out</Link>
                        </>
                        :
                        <>
                            <Link className='nav-link active' to="/register">Register</Link>
                            <Link className='nav-link active' to="/login">Login</Link>
                        </>
                    }

                </div>
            </div>
        </div>
    </nav>
    )
}
