import React, { useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import { Typography, Box, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VideoItem from '../VideoList/VideoList';

export default function UserProfile() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100"
        >
            <Box className="max-w-5xl mx-auto">
                <Typography variant="h4" className="text-center font-bold text-gray-800 mb-6">
                    User Profile
                </Typography>
                <Box className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <Typography variant="h6">Username: {user.username}</Typography>
                    <Typography variant="h6">Email: {user.email}</Typography>
                    <Button
                        variant="contained"
                        className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        onClick={handleLogout}
                    >
                        Log Out
                    </Button>
                </Box>
                <Typography variant="h5" className="font-bold text-gray-800 mb-4">
                    Your Videos
                </Typography>
                {user.videos.length === 0 ? (
                    <Typography>No videos uploaded yet.</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {user.videos.map((video) => (
                            <Grid item xs={12} sm={6} md={3} key={video.id}>
                                <VideoItem
                                    video={video}
                                    isExpanded={false}
                                    onExpand={() => {}}
                                    onCollapse={() => {}}
                                    onDelete={() => {
                                        user.videos = user.videos.filter(v => v.id !== video.id);
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </motion.div>
    );
}