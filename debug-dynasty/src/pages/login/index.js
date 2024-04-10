import React from 'react';
import './index.css';

const Login = () => {
    return (
        <div className="login-container">
            <form action="">
                <h1>Login</h1>
                <h3>Enter your email and password to log in!</h3>
                <hr></hr>
                <div className="input-box">
                    <h3>Email*</h3>
                    <input type="text" placeholder="debugger@whatever.com" required />
                </div>
                <div className="input-box">
                    <h3>Password*</h3>
                    <input type="password" placeholder="Min. 8 characters" required />
                </div>

                <div className="keep-forgot">
                    <label><input type="checkbox" />Keep me logged in</label>
                    <a href="#">Forgot password?</a>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    );
}

export default Login;