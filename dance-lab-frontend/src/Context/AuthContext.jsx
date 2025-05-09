import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:9090/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setUser(response.data);
            }).catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:9090/api/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        const profile = await axios.get('http://localhost:9090/api/users/profile', {
            headers: { Authorization: `Bearer ${response.data.token}` }
        });
        setUser(profile.data);
    };

    const register = async (username, email, password) => {
        const response = await axios.post('http://localhost:9090/api/auth/signup', { username, email, password });
        localStorage.setItem('token', response.data.token);
        const profile = await axios.get('http://localhost:9090/api/users/profile', {
            headers: { Authorization: `Bearer ${response.data.token}` }
        });
        setUser(profile.data);
    };

    const googleLogin = async (credential) => {
        window.location.href = 'http://localhost:9090/api/auth/google';
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};