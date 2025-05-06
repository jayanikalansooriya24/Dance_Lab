import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import {
    TextField, Button, Typography, Box, Paper, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const urlParams = new URLSearchParams(location.search);
            const token = urlParams.get('token');
            if (token) {
                localStorage.setItem('token', token);
                try {
                    const response = await axios.get('http://localhost:9090/api/auth/profile', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    navigate('/profile');
                } catch (err) {
                    setError('Failed to authenticate with Google');
                }
            }
        };
        handleGoogleCallback();
    }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        googleLogin();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center items-center p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100"
        >
            <Paper elevation={6} className="p-6 sm:p-8 rounded-2xl max-w-md w-full bg-white/95 backdrop-blur-sm">
                <Typography variant="h4" className="text-center font-bold text-gray-800 mb-6">
                    Log In
                </Typography>
                {error && (
                    <Typography className="text-red-600 mb-4 text-center">
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="mb-4"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="mb-4"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} className="mr-2" /> : 'Log In'}
                    </Button>
                </form>
                <Button
                    variant="outlined"
                    fullWidth
                    className="mt-4 border-indigo-500 text-indigo-500 hover:bg-indigo-50"
                    onClick={handleGoogleLogin}
                >
                    Sign in with Google
                </Button>
                <Typography className="text-center mt-4">
                    Don't have an account? <a href="/signup" className="text-indigo-600">Sign Up</a>
                </Typography>
            </Paper>
            <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </motion.div>
    );
}