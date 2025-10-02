import React from 'react' 
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

    return (
        <div className='navbar'>
            <div className='logo'>
                <img src='#'></img>
            </div>
            <ul className='nav-menu'>
                <li><Link to='/'>Home</Link></li>
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
                        <button onClick={() => {
                            localStorage.setItem('isAuthenticated', 'false')
                            window.location.href = '/'
                        }}>Logout</button>
                    ) : (<Link to='/login'><button>Login</button></Link>)
                }
            </div>
        </div>
    )
}

export default Navbar