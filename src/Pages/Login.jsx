import React, { useEffect, useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
    const [fadeIn, setFadeIn] = useState(false)
    const navigate = useNavigate()
    // Get login function from context
    const { login } = useAuth()

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 100)
    })

    const handleLogin = (e) => {
        e.preventDefault()
        login()
        navigate('/gallery')
    }

    return (
        <div className={`form-container ${fadeIn ? 'fade-in' : ''}`}>
            <div className="form-content">
                <div className="form-img">
                    <img src="#" alt="image" />
                </div>
                <div className="form-signin">                   
                    <h2>Hello!</h2>
                    <p>Sign in to access your gallery</p>
                    <label className="username">
                        <input type="text" id="username" placeholder="Username" />
                    </label>
                    <label className="password">
                        <input type="password" id="password" placeholder="Password" />
                    </label>
                    <li className="pass-reset">Forgot password?</li>
                    <button className="login-button" onClick={handleLogin}>Login</button>
                    <li className="create-acc">Create Account</li>
                </div>
            </div>
        </div>
    )
}

export default Login