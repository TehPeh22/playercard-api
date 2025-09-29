import React from 'react' 
import './Navbar.css'
const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='logo'>
                <img src='#'></img>
            </div>
            <div className='search-bar'>
                <input type='text' placeholder='search...'></input>
            </div>
            <ul className='nav-menu'>
                <li>Home</li>
                <li>Contact</li>
            </ul>
            <div className='nav-login'>
                <button>Login</button>
            </div>
        </div>
    )
}

export default Navbar