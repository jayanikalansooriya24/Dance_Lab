import { useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export default function VideoCard({ video }) {
    // Ensure the video prop is defined before attempting to access its properties
    if (!video) {
        return <div>Loading...</div>; // Show a loading state if video is not yet available
    }

    const [liked, setLiked] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const handleLike = () => setLiked(!liked);
    const handleFavorite = () => setFavorited(!favorited);
    const handleBookmark = () => setBookmarked(!bookmarked);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card sx={{ maxWidth: 345, m: 2 }}>
                {/* Make sure videoUrl exists before passing to src */}
                {video.videoUrl ? (
                    <CardMedia
                        component="video"
                        src={video.videoUrl}
                        controls
                        sx={{ height: 200, objectFit: "cover" }}
                    />
                ) : (
                    <div>Video unavailable</div> // Handle the case where videoUrl is missing
                )}
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {video.title || "Untitled Video"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Difficulty: {video.difficulty || "Unknown"} | Style: {video.style || "Unknown"}
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Tooltip title={liked ? "Unlike" : "Like"}>
                            <motion.div whileTap={{ scale: 1.2 }}>
                                <IconButton onClick={handleLike}>
                                    {liked ? <ThumbUpIcon color="primary" /> : <ThumbUpOffAltIcon />}
                                </IconButton>
                            </motion.div>
                        </Tooltip>
                        <Tooltip title={favorited ? "Unfavorite" : "Favorite"}>
                            <motion.div whileTap={{ scale: 1.2 }}>
                                <IconButton onClick={handleFavorite}>
                                    {favorited ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </motion.div>
                        </Tooltip>
                        <Tooltip title={bookmarked ? "Unbookmark" : "Bookmark"}>
                            <motion.div whileTap={{ scale: 1.2 }}>
                                <IconButton onClick={handleBookmark}>
                                    {bookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                                </IconButton>
                            </motion.div>
                        </Tooltip>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
