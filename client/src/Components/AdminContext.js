import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);


    const login = (adminData) => {
        setAdmin(adminData);
        localStorage.setItem('adminToken', adminData.token);
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('adminToken');
    };

    return (
        <AdminContext.Provider value={{ admin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};
