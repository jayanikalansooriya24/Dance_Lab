import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple regex for validating email format
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="login-container"
    >
      <Paper elevation={6} className="login-card">
        <Typography variant="h4" className="login-title">
          Log In
        </Typography>

        {error && (
          <Typography className="login-error">
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
            error={!!error && (!email || !validateEmail(email))}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!error && password.length < 6}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="login-button"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} className="mr-2" /> : 'Log In'}
          </Button>
        </form>

        <Button
          variant="outlined"
          fullWidth
          className="google-button"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>

        <Typography className="signup-text">
          Don’t have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </Typography>
      </Paper>

      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </motion.div>
  );
}
