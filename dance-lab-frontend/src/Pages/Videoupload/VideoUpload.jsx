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
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import "./VideoUpload.css";

export default function VideoUpload({ onUpload = () => {} }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [style, setStyle] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !difficulty || !style) {
      setError("All fields are required!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("difficulty", difficulty);
    formData.append("style", style);

    try {
      const response = await axios.post("http://localhost:9090/api/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpload(response.data);
      setFile(null);
      setTitle("");
      setDifficulty("");
      setStyle("");
      setError(null);
      setSuccess(true);


      console.log("Video uploaded successfully:", response.data);
    } catch (err) {
      setError("Failed to upload video: " + err.message);
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center items-center p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100"
    >
      <Paper
        elevation={6}
        className="p-6 sm:p-8 rounded-2xl max-w-md w-full bg-white/95 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Typography
            variant="h4"
            className="text-center font-bold text-gray-800 mb-6"
          >
            Upload Your Dance Video
          </Typography>
        </motion.div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Typography className="text-red-600 mb-4 text-center">
              {error}
            </Typography>
          </motion.div>
        )}
        <form onSubmit={handleSubmit}>
          <Box
            className={`file-input-container mb-6 ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept="video/*"
              className="file-input"
            />
            <label htmlFor="file-upload" className="custom-file-label">
              {file ? file.name : "Choose or Drag Video File"}
            </label>
          </Box>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              className="mb-4"
              InputProps={{
                className: "rounded-lg",
              }}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <FormControl fullWidth margin="normal" className="mb-4">
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                label="Difficulty"
                className="rounded-lg"
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <TextField
              label="Style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              className="mb-4"
              InputProps={{
                className: "rounded-lg",
              }}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-md"
              disabled={uploading}
            >
              {uploading ? (
                <Box display="flex" alignItems="center">
                  <CircularProgress size={20} className="mr-2" />
                  Uploading...
                </Box>
              ) : (
                "Upload Video"
              )}
            </Button>
          </motion.div>
        </form>
      </Paper>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Video uploaded successfully!
        </Alert>
      </Snackbar>
    </motion.div>
  );
}