import React, { useState,useContext  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AdminContext } from './AdminContext';




const AdminLogin = () => {
    const { login } = useContext(AdminContext);
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:2024/api/admin/auth/login', formData);
            setMessage(response.data.message,'Login successful');
            console.log(response.data); // Log the response data
        login(response.data.admin);
 // Store token in local storage or context
 localStorage.setItem('token', response.data.token);
 // Navigate to the home page
 navigate('/'); 
       } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Login failed. Please try again.');
            }
        }
    };
    // Inline styles for the login container with background image
    const loginContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${process.env.PUBLIC_URL}/res4.jpg)`, // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    // Inline styles for the login form
    const loginFormStyle = {
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
        backgroundColor: '#007bff',
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
        <div style={loginContainerStyle}>
        <form style={loginFormStyle} onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '30px', color: '#333' }}>Admin Login</h2>
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
            <button type="submit" style={buttonStyle}>Login</button>
            {message && <p style={messageStyle}>{message}</p>}
            <div>
            Don't have an account? <Link to="/adminregister">Register</Link>
            </div>
        </form>
    </div>
    );
};

export default AdminLogin;
