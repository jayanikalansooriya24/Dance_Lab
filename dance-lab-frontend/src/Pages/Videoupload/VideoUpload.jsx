import { useState } from "react";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import { motion } from "framer-motion";

export default function VideoUpload({ onUpload }) {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [style, setStyle] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file || !title || !difficulty || !style) {
            setError("All fields are required!");
            return;
        }
        // Mock video upload
        const newVideo = {
            id: Date.now(),
            title,
            videoUrl: URL.createObjectURL(file), // Use local file URL for preview
            difficulty,
            style,
        };
        onUpload(newVideo);
        setError(null);
        setFile(null);
        setTitle("");
        setDifficulty("");
        setStyle("");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Paper elevation={3} sx={{ p: 3, mb: 3, maxWidth: 500, mx: "auto" }}>
                <Typography variant="h5" gutterBottom>
                    Upload a Dance Video
                </Typography>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 2 }}>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            accept="video/*"
                            style={{ display: "block", width: "100%" }}
                        />
                    </Box>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Difficulty</InputLabel>
                        <Select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            label="Difficulty"
                        >
                            <MenuItem value="beginner">Beginner</MenuItem>
                            <MenuItem value="intermediate">Intermediate</MenuItem>
                            <MenuItem value="advanced">Advanced</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Style"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Upload Video
                        </Button>
                    </motion.div>
                </form>
            </Paper>
        </motion.div>
    );
}