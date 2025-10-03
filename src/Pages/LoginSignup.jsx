import React from "react";
import './LoginSignup.css'

const LoginSignup = () => {
    return (
        <div className="form-container">
            <div className="form-content">
                <div className="form-img">
                    <img src="#"></img>
                </div>
                <div className="form-signin">
                    <h2>Sign In</h2>
                    <form>
                        <label for="firstname">First Name
                            <input type="text" />
                        </label>
                        <label for="lastname">Last Name
                            <input type="text" />
                        </label>
                        <label for="email">Email
                            <input type="text" />
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup