import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Typography, Box, Grid, IconButton, TextField, List, ListItem, ListItemText, Button } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ExpandIcon from "@mui/icons-material/Expand";
import CollapseIcon from "@mui/icons-material/Compress";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import "./VideoList.css";

// Component for an individual video item
function VideoItem({ video, isExpanded, onExpand, onCollapse, onDelete }) {
  const videoSrc = `http://localhost:9090${video.videoUrl}`;
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(video.likes || 0);
  const [dislikes, setDislikes] = useState(video.dislikes || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editTitle, setEditTitle] = useState(video.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  // Fetch comments when the comment section is toggled or after an action that modifies comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/videos/${video.id}/comments`);
      const sortedComments = response.data.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });
      setComments(sortedComments);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

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
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
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
        await axios.post(`http://localhost:9090/api/videos/${video.id}/like`, { action: "unlike" });
        setLikes(likes - 1);
        setLiked(false);
      } else {
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
        await axios.post(`http://localhost:9090/api/videos/${video.id}/dislike`, { action: "undislike" });
        setDislikes(dislikes - 1);
        setDisliked(false);
      } else {
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
      await axios.post(`http://localhost:9090/api/videos/${video.id}/comments`, {
        text: newComment,
      });
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(`http://localhost:9090/api/videos/${video.id}/comments/${commentId}`, {
        text: editCommentText,
      });
      setEditingCommentId(null);
      setEditCommentText("");
      fetchComments();
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:9090/api/videos/${video.id}/comments/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleShare = () => {
    const shareUrl = `http://localhost:5173/video/${video.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Video URL copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy URL:", err);
    });
  };

  const handleUpdateTitle = async () => {
    try {
      await axios.put(`http://localhost:9090/api/videos/${video.id}`, { title: editTitle });
      video.title = editTitle;
      setIsEditingTitle(false);
    } catch (err) {
      console.error("Failed to update title:", err);
    }
  };

  const handleDeleteVideo = async () => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await axios.delete(`http://localhost:9090/api/videos/${video.id}`);
        onDelete(video.id);
        alert("Video deleted successfully!");
      } catch (err) {
        console.error("Failed to delete video:", err);
      }
    }
  };

  return (
    <Box className={`video-card ${isExpanded ? "expanded" : ""}`}>
      <Box className="video-container">
        <video
          ref={videoRef}
          controls
          src={videoSrc}
          type="video/mp4"
          className="video-player"
          onError={handleVideoError}
          autoPlay={isExpanded}
        />
        <Box className="video-overlay">
          <IconButton className="control-button fullscreen" onClick={handleFullscreen} aria-label="fullscreen">
            <FullscreenIcon />
          </IconButton>
          <IconButton className="control-button expand" onClick={handleToggleExpand} aria-label={isExpanded ? "collapse" : "expand"}>
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </IconButton>
        </Box>
      </Box>
      <Box className="video-info">
        <Box className="title-section">
          {isEditingTitle ? (
            <Box className="title-edit">
              <TextField
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                className="title-input"
              />
              <IconButton onClick={handleUpdateTitle} aria-label="save title">
                <CheckIcon />
              </IconButton>
            </Box>
          ) : (
            <Box className="title-display">
              <Typography variant="h6" className="video-title">{editTitle}</Typography>
              <IconButton onClick={() => setIsEditingTitle(true)} aria-label="edit title">
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box className="video-details">
          <Typography variant="caption">Style: {video.style}</Typography>
          <Typography variant="caption">Difficulty: {video.difficulty}</Typography>
        </Box>
        <Box className="action-bar">
          <Box className="action-group">
            <IconButton onClick={handleLike} aria-label="like">
              <ThumbUpIcon className={liked ? "active" : ""} />
            </IconButton>
            <Typography variant="caption">{likes}</Typography>
            <IconButton onClick={handleDislike} aria-label="dislike">
              <ThumbDownIcon className={disliked ? "active" : ""} />
            </IconButton>
            <Typography variant="caption">{dislikes}</Typography>
          </Box>
          <IconButton onClick={handleToggleComments} aria-label="comment">
            <CommentIcon />
          </IconButton>
          <IconButton onClick={handleShare} aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleDeleteVideo} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      {showComments && (
        <Box className="comments">
          <Box className="comment-input-wrapper">
            <TextField
              placeholder="Add a comment..."
              variant="outlined"
              size="small"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <Button onClick={handleAddComment} variant="contained" size="small">
              Post
            </Button>
          </Box>
          <List className="comment-list">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <ListItem key={comment.id || `comment-${video.id}-${index}`} className="comment-item">
                  {editingCommentId === comment.id ? (
                    <Box className="comment-edit">
                      <TextField
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                      <IconButton onClick={() => handleUpdateComment(comment.id)} aria-label="save comment">
                        <CheckIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditingCommentId(null)} aria-label="cancel edit">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box className="comment-content">
                      <ListItemText primary={comment.text} />
                      <IconButton
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditCommentText(comment.text);
                        }}
                        aria-label="edit comment"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteComment(comment.id)} aria-label="delete comment">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </ListItem>
              ))
            ) : (
              <Typography variant="caption" className="no-comments">
                No comments yet. Be the first!
              </Typography>
            )}
          </List>
        </Box>
      )}
    </Box>
  );
}

// Main component to display a list of dance videos
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

  const handleDeleteVideo = (videoId) => {
    setVideos(videos.filter((video) => video.id !== videoId));
  };

  if (loading) return <Typography variant="h6" align="center" className="loading">Loading videos...</Typography>;
  if (error) return <Typography variant="h6" align="center" className="error">{error}</Typography>;

  const expandedVideo = videos.find((video) => video.id === expandedVideoId);

  return (
    <Box className="video-list">
      <Typography variant="h4" className="page-title">
        Dance Videos
      </Typography>
      {expandedVideo && (
        <Box className="expanded-section">
          <VideoItem
            video={expandedVideo}
            isExpanded={true}
            onExpand={handleExpand}
            onCollapse={handleCollapse}
            onDelete={handleDeleteVideo}
          />
        </Box>
      )}
      <Grid container spacing={3}>
        {videos
          .filter((video) => !expandedVideo || video.id !== expandedVideoId)
          .map((video) => (
            <Grid item xs={12} sm={6} md={3} key={video.id}>
              <VideoItem
                video={video}
                isExpanded={false}
                onExpand={handleExpand}
                onCollapse={handleCollapse}
                onDelete={handleDeleteVideo}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}