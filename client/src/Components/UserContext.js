import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser || null); // Initialize user state with localStorage data
console.log('conuser',user)
    const login = (userData) => {
        setUser(userData); // Set the logged-in user data upon successful login
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
    };

    const logout = () => {
        setUser(null); // Clear user data on logout
        localStorage.removeItem('user');
    };

    useEffect(() => {
        // Optionally, you can perform any initialization or checks here
        // This useEffect runs once when the component mounts
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
