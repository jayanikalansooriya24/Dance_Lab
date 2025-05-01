import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Typography, Box, Grid, IconButton, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ExpandIcon from "@mui/icons-material/Expand";
import CollapseIcon from "@mui/icons-material/Compress";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import "./VideoList.css";

// Component for an individual video item
function VideoItem({ video, isExpanded, onExpand, onCollapse }) {
  const videoSrc = `http://localhost:9090${video.videoUrl}`;
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(video.likes || 0);
  const [dislikes, setDislikes] = useState(video.dislikes || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/videos/${video.id}/comments`);
      console.log("Fetched comments for video", video.id, ":", response.data);
      const fetchedComments = response.data || [];
      setComments(fetchedComments);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setComments([]);
    }
  };

  // Fetch comments when the comment section is toggled
  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments, video.id]);

  const handleVideoError = (e) => {
    console.error("Video failed to load:", videoSrc, e.target.error);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Safari
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE11
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      onCollapse();
    } else {
      onExpand(video.id);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        // Unlike
        await axios.post(`http://localhost:9090/api/videos/${video.id}/like`, { action: "unlike" });
        setLikes(likes - 1);
        setLiked(false);
      } else {
        // Like
        await axios.post(`http://localhost:9090/api/videos/${video.id}/like`, { action: "like" });
        setLikes(likes + 1);
        setLiked(true);
        if (disliked) {
          setDislikes(dislikes - 1);
          setDisliked(false);
        }
      }
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  const handleDislike = async () => {
    try {
      if (disliked) {
        // Undislike
        await axios.post(`http://localhost:9090/api/videos/${video.id}/dislike`, { action: "undislike" });
        setDislikes(dislikes - 1);
        setDisliked(false);
      } else {
        // Dislike
        await axios.post(`http://localhost:9090/api/videos/${video.id}/dislike`, { action: "dislike" });
        setDislikes(dislikes + 1);
        setDisliked(true);
        if (liked) {
          setLikes(likes - 1);
          setLiked(false);
        }
      }
    } catch (err) {
      console.error("Failed to update dislike:", err);
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const response = await axios.post(`http://localhost:9090/api/videos/${video.id}/comments`, {
        text: newComment,
      });
      console.log("Added comment response:", response.data);
      setNewComment("");
      setTimeout(fetchComments, 500);
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert("Failed to add comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:9090/api/videos/${video.id}/comments/${commentId}`);
      setTimeout(fetchComments, 500);
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.text);
  };

  const handleUpdateComment = async (commentId) => {
    if (editingCommentText.trim() === "") return;
    try {
      await axios.put(`http://localhost:9090/api/videos/${video.id}/comments/${commentId}`, {
        text: editingCommentText,
      });
      setEditingCommentId(null);
      setEditingCommentText("");
      setTimeout(fetchComments, 500);
    } catch (err) {
      console.error("Failed to update comment:", err);
      alert("Failed to update comment. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  const handleShare = () => {
    const shareUrl = `http://localhost:5173/video/${video.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Video URL copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy URL:", err);
    });
  };

  return (
    <Box className={`video-item ${isExpanded ? "expanded" : ""}`}>
      <Box className="video-wrapper">
        <video
          ref={videoRef}
          controls
          src={videoSrc}
          type="video/mp4"
          className="video-player"
          onError={handleVideoError}
          autoPlay={isExpanded}
        />
        <Box className="video-controls">
          <IconButton
            className="expand-button"
            onClick={handleToggleExpand}
            aria-label={isExpanded ? "collapse" : "expand"}
          >
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </IconButton>
          <IconButton
            className="fullscreen-button"
            onClick={handleFullscreen}
            aria-label="fullscreen"
          >
            <FullscreenIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className="video-meta">
        <Typography variant="h6" className="video-title">
          {video.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Style: {video.style}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Difficulty: {video.difficulty}
        </Typography>
      </Box>
      <Box className="video-actions">
        <Box className="like-dislike">
          <IconButton onClick={handleLike} aria-label="like">
            <ThumbUpIcon color={liked ? "primary" : "inherit"} />
          </IconButton>
          <Typography variant="body2">{likes}</Typography>
          <IconButton onClick={handleDislike} aria-label="dislike">
            <ThumbDownIcon color={disliked ? "secondary" : "inherit"} />
          </IconButton>
          <Typography variant="body2">{dislikes}</Typography>
        </Box>
        <IconButton onClick={handleToggleComments} aria-label="comment">
          <CommentIcon />
        </IconButton>
        <IconButton onClick={handleShare} aria-label="share">
          <ShareIcon />
        </IconButton>
      </Box>
      {showComments && (
        <Box className="comment-section">
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleAddComment} variant="contained" color="primary">
            Comment
          </Button>
          {comments.length > 0 ? (
            <List>
              {comments.map((comment, index) => (
                <ListItem key={comment.id || index}>
                  {editingCommentId === comment.id ? (
                    <>
                      <TextField
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                      />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => handleUpdateComment(comment.id)} aria-label="save">
                          <SaveIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit} aria-label="cancel">
                          <CancelIcon color="secondary" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </>
                  ) : (
                    <>
                      <ListItemText primary={comment.text || "No text available"} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => handleEditComment(comment)} aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteComment(comment.id)} aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </>
                  )}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary" style={{ padding: "12px" }}>
              No comments yet. Be the first to comment!
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

// Main component to display a list of dance videos in a YouTube-like UI
export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedVideoId, setExpandedVideoId] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:9090/api/videos");
        setVideos(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch videos: " + err.message);
        setLoading(false);
        console.error("Failed to fetch videos:", err);
      }
    };
    fetchVideos();
  }, []);

  const handleExpand = (videoId) => {
    setExpandedVideoId(videoId);
  };

  const handleCollapse = () => {
    setExpandedVideoId(null);
  };

  if (loading) return <Typography variant="h6" align="center">Loading videos...</Typography>;
  if (error) return <Typography variant="h6" align="center" color="error">{error}</Typography>;

  const expandedVideo = videos.find((video) => video.id === expandedVideoId);

  return (
    <Box className="video-list-container">
      <Typography variant="h4" gutterBottom align="center">
        Dance Videos
      </Typography>

      {expandedVideo && (
        <Box className="expanded-video-section">
          <VideoItem
            video={expandedVideo}
            isExpanded={true}
            onExpand={handleExpand}
            onCollapse={handleCollapse}
          />
        </Box>
      )}

      <Grid container spacing={3}>
        {videos
          .filter((video) => !expandedVideo || video.id !== expandedVideoId)
          .map((video) => (
            <Grid item xs={12} sm={6} md={6} key={video.id}>
              <VideoItem
                video={video}
                isExpanded={false}
                onExpand={handleExpand}
                onCollapse={handleCollapse}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}