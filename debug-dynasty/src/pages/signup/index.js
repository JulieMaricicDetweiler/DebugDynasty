import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import firebaseConfig from '../../firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import './index.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(
                firebaseConfig.auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;
            await setDoc(doc(firebaseConfig.firestore, "users", user.uid), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            });
            console.log("User registered and data saved.");
            navigate('/dashboard');
        } catch (error) {
            console.error("Error during registration: ", error.message);
            alert(`Failed to create account: ${error.message}`);
        }
    };

    return (
        <div className="signup-container">
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <hr />
            <div className="input-box">
                <h3>First Name</h3>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="input-box">
                <h3>Last Name</h3>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="input-box">
                <h3>Email</h3>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-box">
                <h3>Password</h3>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="input-box">
                <h3>Confirm Password</h3>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="horriblebutton">Register</button>
            <div className="register-link">
                <p>Already have an account? <a href="/login">Log In</a></p>
            </div>
        </form>
        </div>
    );
}

export default Signup;
