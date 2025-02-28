import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AdminRegister = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:2024/api/admin/auth/register', formData);
            setMessage(response.data.message);
            navigate('/adminlogin'); 
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Registration failed. Please try again.');
            }
        }
    };

     // Inline styles for the registration container with background image
     const registerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${process.env.PUBLIC_URL}/res4.jpg)`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    // Inline styles for the registration form
    const registerFormStyle = {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    };

    const inputStyle = {
        width: '100%',
        height:'3rem',
        padding: '12px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
    };

    const buttonStyle = {
        backgroundColor: '#28a745',
        width: '100%',
        height:'3rem',
        color: '#fff',
        border: 'none',
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const messageStyle = {
        marginTop: '15px',
        color: '#dc3545',
    };

    return (
        <div style={registerContainerStyle}>
            <form style={registerFormStyle} onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: '30px', color: '#333' }}>Admin Register</h2>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        name="username"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        style={inputStyle}
                        required
                    />
                </div>
                <button type="submit" style={buttonStyle}>Register</button>
                <div>
            Already have an account?<Link to="/adminlogin"> Login</Link>
            </div>
            </form>
            {message && <p className="register-message-unique">{message}</p>}
            
        </div>
    );
};

export default AdminRegister;
