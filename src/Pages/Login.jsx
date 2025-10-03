import React, { useEffect, useState } from "react";
import './Login.css'

const Login = () => {
    const [fadeIn, setFadeIn] = useState(false)

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 100)
    })

    return (
        <div className={`form-container ${fadeIn ? 'fade-in' : ''}`}>
            <div className="form-content">
                <div className="form-img">
                    <img src="#" alt="image" />
                </div>
                <div className="form-signin">                   
                    <h2>Hello!</h2>
                    <p>Login your account</p>
                    <label htmlFor="username">
                        <input type="text" id="username" placeholder="Username" />
                    </label>
                    <label htmlFor="password">
                        <input type="password" id="password" placeholder="Password" />
                    </label>
                    <li className="pass-reset">Forgot password?</li>
                    <button className="login-button">Login</button>
                    <li className="create-acc">Create Account</li>
                </div>
            </div>
        </div>
    )
}

export default Login