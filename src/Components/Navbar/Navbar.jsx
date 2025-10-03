import React from 'react' 
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const Navbar = () => {
    // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className='navbar'>
            <div className='logo'>
                <img src='#'></img>
            </div>
            <ul className='nav-menu'>
                {
                    !isAuthenticated && (
                        <li><Link to='/'>Home</Link></li>
                    )
                }

                {
                    isAuthenticated && (
                        <>
                            <li><Link to='/gallery'>Gallery</Link></li>
                            <li><Link to='/payment'>Payment</Link></li>
                        </>
                    )
                }
                <li>Support</li>
            </ul>
            <div className='nav-login'>
                {
                    isAuthenticated ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to='/login'><button>Login</button></Link>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar