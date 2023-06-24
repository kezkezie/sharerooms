import React, { useEffect, useState } from 'react'
//import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('currentUser')))
    },[])
    console.log(user)
    //const navigate = useNavigate()
    function logout() {
        localStorage.removeItem('currentUser')
        //navigate('/login')

        window.location.href = '/login'
    }


    return (
        <div>
            <nav class="navbar navbar-expand-lg ">
                <a class="navbar-brand" href="/home">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"><i class="fa fa-bars" style={{color: 'white'}}></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav" style={{ marginRight: "50px" }}>
                    <ul class="navbar-nav mr-5" >

                        {user && user.data != null ?
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-user" style={{color: 'white'}}></i>{user.data.name}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="/profile">Profile</a>
                                    <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                                </div>
                            </div>
                            : <>

                                <li class="nav-item active">
                                    <a class="nav-link" href="/register">Register </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/login">Login</a>
                                </li>
                            </>

                        }

                    </ul>
                </div>
            </nav>
        </div>
    )
}
