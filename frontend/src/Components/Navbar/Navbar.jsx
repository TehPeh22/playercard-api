import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
        setIsMenuOpen(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className='logo'>
                <img src='#' alt='Logo'></img>
            </div>

            {/* Hamburger Icon */}
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                {/* Remove home in nav when not authenticated */}
                {
                    !isAuthenticated && (
                        <li onClick={closeMenu}><Link to='/'>Home</Link></li>
                    )
                }

                {
                    isAuthenticated && (
                        <>
                            <li onClick={closeMenu}><Link to='/gallery'>Gallery</Link></li>
                            <li onClick={closeMenu}><Link to='/payment'>Payment</Link></li>
                        </>
                    )
                }
                <li onClick={closeMenu}>Support</li>
            </ul>

            <div className='nav-login'>
                {
                    isAuthenticated ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to='/login' onClick={closeMenu}><button>Login</button></Link>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar