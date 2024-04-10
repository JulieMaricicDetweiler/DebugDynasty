import React from 'react';
import { useState } from 'react';
import './index.css';


const Signup = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validate form data
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        
        // TODO form submission
        try {
            //Send data to server
            const response = await fetch('PLACEHOLDER.PLACEHOLDER/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Signup successful! Somehow...");

            } else {
                alert("Error: Signup failed");

            }
        } catch (error) {
            
            console.error("Error:", error);
            alert("Error: Signup not implemented");
        }
    };

    return (
        <div className="signup-container">
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <hr></hr>
            <div className="input-box">
                <h3>Email</h3>
            <input type="email" name="email" placeholder="email@address.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-box">
                <h3>Password</h3>
                <input type="password" name="password" placeholder="Min. 8 characters" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="input-box">
                <h3>Confirm Password</h3>
                <input type="password" name="confirmPassword" placeholder="Must match password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <button type="submit" class="horriblebutton">Register</button>

            <div className="register-link">
                <p>Already have an account? <a href="/login">Log In</a></p>
            </div>
        </form>
        </div>
    );
}

export default Signup;