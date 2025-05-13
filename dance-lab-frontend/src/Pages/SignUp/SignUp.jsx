import React, { useState } from 'react';
import {
    TextField, Button, Typography, Box, Paper, Snackbar, Alert, CircularProgress,
    useTheme, styled, alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.spacing(2),
        transition: 'all 0.3s ease-in-out',
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
        },
        '&.Mui-focused': {
            backgroundColor: alpha(theme.palette.background.paper, 1),
            boxShadow: `0 4px 20px 0 ${alpha(theme.palette.primary.main, 0.25)}`
        }
    },
    '& .MuiInputLabel-root': {
        fontWeight: 500,
    },
    '& .MuiInputAdornment-root': {
        color: theme.palette.text.secondary
    }
}));

const GradientButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    fontWeight: 'bold',
    fontSize: '1rem',
    letterSpacing: '0.5px',
    borderRadius: theme.spacing(3),
    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`
    },
    '&:active': {
        transform: 'translateY(1px)',
    }
}));

const FormPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4, 5),
    borderRadius: theme.spacing(3),
    maxWidth: 450,
    width: '100%',
    backgroundColor: alpha(theme.palette.background.paper, 0.85),
    backdropFilter: 'blur(12px)',
    boxShadow: `0 20px 40px ${alpha('#000', 0.12)}`,
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    }
}));

const LoginLink = styled('a')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        textDecoration: 'none',
    }
}));

export default function Signup() {
    const theme = useTheme();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validations
        if (!username || !email || !password) {
            setError("All fields are required.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Signup successful (simulated)!");
        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
                duration: 0.8
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: { xs: 2, sm: 4, md: 6 },
                minHeight: '100vh',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.4)} 0%, ${alpha(theme.palette.secondary.light, 0.4)} 100%)`,
            }}
        >
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
                <FormPaper elevation={8}>
                    <motion.div variants={itemVariants}>
                        <Typography 
                            variant="h4" 
                            align="center" 
                            fontWeight="bold" 
                            gutterBottom
                            sx={{
                                background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Create Account
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Typography 
                            variant="body1" 
                            align="center" 
                            color="text.secondary" 
                            sx={{ mb: 4 }}
                        >
                            Join our community and start your journey
                        </Typography>
                    </motion.div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Alert 
                                severity="error" 
                                sx={{ 
                                    mb: 3, 
                                    borderRadius: theme.spacing(2),
                                    boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.2)}`
                                }}
                            >
                                {error}
                            </Alert>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <motion.div variants={itemVariants}>
                            <StyledTextField
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <AccountCircleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                }}
                                helperText="Choose a unique username"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <StyledTextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <EmailIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                }}
                                helperText="We'll never share your email"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <StyledTextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <LockIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                }}
                                helperText="Minimum 8 characters"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <GradientButton
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                disableElevation
                            >
                                {loading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                                        <Typography>Creating Account...</Typography>
                                    </Box>
                                ) : (
                                    'Sign Up'
                                )}
                            </GradientButton>
                        </motion.div>
                    </form>

                    <motion.div variants={itemVariants}>
                        <Box 
                            sx={{ 
                                mt: 4, 
                                textAlign: 'center',
                                p: 2,
                                borderRadius: theme.spacing(2),
                                backgroundColor: alpha(theme.palette.background.paper, 0.5)
                            }}
                        >
                            <Typography variant="body2">
                                Already have an account? <LoginLink href="/login">Log In</LoginLink>
                            </Typography>
                        </Box>
                    </motion.div>
                </FormPaper>
            </motion.div>

            <Snackbar 
                open={!!error} 
                autoHideDuration={5000} 
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    severity="error" 
                    variant="filled"
                    sx={{ 
                        borderRadius: 2,
                        boxShadow: 4
                    }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}
