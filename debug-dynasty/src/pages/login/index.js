import React, { useState, useEffect } from 'react';
import './index.css';
import Button from "../../components/UI-Button/Button.js";
import { Link } from 'react-router-dom';
import firebaseConfig from "../../firebase/firebaseConfig.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authUser, setAuthUser] = useState(null);
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {    
        const unsubscribe = onAuthStateChanged(firebaseConfig.auth, (user) => {
            if (user) {
                setAuthUser(user);
                navigate('/dashboard'); // Redirects to user page if already logged in
            } else {
                setAuthUser(null);
            }
        });
        return () => unsubscribe();
    }, [firebaseConfig.auth, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(firebaseConfig.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Logged in:", user);
            })
            .catch((error) => {
                console.error("Login error:", error);
                setLoginFailed(true); // Show an error message or alert
            });
    };

    return (
        <div className="login-container">
            <div className="login-container-left">
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>Login</h1>
                    <h3>Enter your email and password to log in!</h3>
                    <hr />
                    <div className="input-box">
                        <h3>Email*</h3>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@example.com" required />
                    </div>
                    <div className="input-box">
                        <h3>Password*</h3>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    </div>

                    {loginFailed && <p className="error-message">Login failed. Please try again.</p>}

                    <div className="keep-forgot">
                        <label><input type="checkbox" />Keep me logged in</label>
                        <Link to="/forgot-password" style={{ textDecoration: "none" }}>Forgot password?</Link>
                    </div>

                    <button type="submit" className="horriblebutton">Login</button>

                    <div className="register-link">
                        <label>Don't have an account?</label>
                        <Link to="/signup" style={{ textDecoration: "none" }}>
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;