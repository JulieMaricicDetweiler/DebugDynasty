import React from 'react';
import './index.css';
import Button from "../UI-Button/Button.js";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-container-left">
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

                    <Button text={"Login"} btnClass={"btn-green"} href={"#"} />

                    <div className="register-link">
                        <label>Don't have an account?</label>
                        <Link to="/signup" style={{ textDecoration: "none" }}>
                            <a href="#">Register</a>
                        </Link>
                    </div>
                </form>
            </div>
            <div className="login-container-right">
            </div>
        </div>
    );
}

export default Login;