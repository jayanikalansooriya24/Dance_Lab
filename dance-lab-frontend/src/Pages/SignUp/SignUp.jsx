import React, { useState, useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import {
    TextField, Button, Typography, Box, Paper, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(username, email, password);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
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
                    Sign Up
                </Typography>
                {error && (
                    <Typography className="text-red-600 mb-4 text-center">
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        className="mb-4"
                    />
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
                        {loading ? <CircularProgress size={20} className="mr-2" /> : 'Sign Up'}
                    </Button>
                </form>
                <Typography className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-indigo-600">Log In</a>
                </Typography>
            </Paper>
            <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </motion.div>
    );
}