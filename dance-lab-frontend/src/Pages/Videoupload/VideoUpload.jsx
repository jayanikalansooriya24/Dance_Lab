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
import axios from "axios";
import "./VideoUpload.css";

export default function VideoUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [style, setStyle] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !difficulty || !style) {
      setError("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("difficulty", difficulty);
    formData.append("style", style);

    try {
      const response = await axios.post("http://localhost:8080/api/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onUpload(response.data);
      setFile(null);
      setTitle("");
      setDifficulty("");
      setStyle("");
      setError(null);
    } catch (err) {
      setError("Failed to upload video: " + err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="video-upload-container"
    >
      <Paper elevation={3} className="video-upload-paper">
        <Typography variant="h5" gutterBottom>
          Upload a Dance Video
        </Typography>
        {error && (
          <Typography color="error" className="error-message">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Box className="file-input-container">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="video/*"
              className="file-input"
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
              className="upload-button"
            >
              Upload Video
            </Button>
          </motion.div>
        </form>
      </Paper>
    </motion.div>
  );
}