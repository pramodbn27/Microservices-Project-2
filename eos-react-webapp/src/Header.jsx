import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    let [user, setUser] = useState()
    useEffect(() => {
        getUser()
    }, [!user])

    const getUser = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        setUser(user)
    }

    const navigate = useNavigate()
    const insertToCatalog = () => {
        navigate('/catalog-add')
    }
    const navigateToCart = () => {
        navigate('/kart')
    }
    const navigateToLogin = () => {
        localStorage.clear()
        navigate('/Login')
    }
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                {/* <a className="navbar-brand" onClick={()=>navigate('/catalog')}>Shopping.com</a> */}
                <img src='https://edwiki-webserver-config.s3.amazonaws.com/logo.png' alt="logo" onClick={() => navigate('/catalog')} className="navbar-brand" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={() => navigate('/')}>Home</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={() => insertToCatalog()}>Add Catalog Item</a>
                        </li> */}
                        {user?.username === 'admin' ?<>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={() => insertToCatalog()}>Add Catalog Item</a>
                        </li>
                        </> : <></>}
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigateToCart()}>Cart</a>
                        </li>
                        {user?<>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => navigate('/profile')}>Profile</a></li>
                                <li><a className="dropdown-item" onClick={() => navigateToLogin()}>Logout</a></li>
                            </ul>
                        </li>
                        </>:<>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate('/login')}>Sign In</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => navigate('/signup')}>Sign Up</a>
                        </li>
                        </>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header