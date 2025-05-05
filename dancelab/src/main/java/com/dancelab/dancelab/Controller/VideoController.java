package com.dancelab.dancelab.Controller;

import com.dancelab.dancelab.Model.DanceVideo;
import com.dancelab.dancelab.Model.Comment;
import com.dancelab.dancelab.repository.DanceVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "*")
public class VideoController {

    private static final Logger logger = LoggerFactory.getLogger(VideoController.class);

    @Autowired
    private DanceVideoRepository videoRepository;

    private static final String UPLOAD_DIR = "uploads/videos/";

    @GetMapping
    public List<DanceVideo> getVideos(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String style,
            @RequestParam(required = false) String difficulty) {
        logger.info("Fetching videos with filters - title: {}, style: {}, difficulty: {}", title, style, difficulty);
        if (title != null) {
            List<DanceVideo> videos = videoRepository.findByTitleContaining(title);
            logger.debug("Found {} videos by title: {}", videos.size(), title);
            return videos;
        }
        if (style != null) {
            List<DanceVideo> videos = videoRepository.findByStyle(style);
            logger.debug("Found {} videos by style: {}", videos.size(), style);
            return videos;
        }
        if (difficulty != null) {
            List<DanceVideo> videos = videoRepository.findByDifficulty(difficulty);
            logger.debug("Found {} videos by difficulty: {}", videos.size(), difficulty);
            return videos;
        }
        List<DanceVideo> videos = videoRepository.findAll();
        logger.debug("Found {} videos (all)", videos.size());
        return videos;
    }

    @PostMapping
    public DanceVideo addVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("difficulty") String difficulty,
            @RequestParam("style") String style) throws IOException {
        if (file.isEmpty()) {
            logger.error("Upload failed: No file provided");
            throw new IllegalArgumentException("No file provided");
        }
        if (!file.getContentType().equals("video/mp4")) {
            logger.error("Upload failed: Invalid file type - {}", file.getContentType());
            throw new IllegalArgumentException("Only MP4 videos are allowed! Provided type: " + file.getContentType());
        }

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
            logger.info("Created upload directory: {}", UPLOAD_DIR);
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            originalFilename = "video.mp4";
            logger.warn("Original filename missing extension, defaulting to: {}", originalFilename);
        }

        String fileName = UUID.randomUUID() + "_" + originalFilename;
        Path filePath = Paths.get(UPLOAD_DIR, fileName);

        try {
            Files.write(filePath, file.getBytes());
            logger.info("Saved video file to: {}", filePath.toString());
        } catch (IOException e) {
            logger.error("Failed to save video file to {}: {}", filePath.toString(), e.getMessage());
            throw new IOException("Failed to save video file: " + e.getMessage());
        }

        DanceVideo video = new DanceVideo();
        video.setTitle(title);
        video.setDifficulty(difficulty);
        video.setStyle(style);
        video.setVideoUrl("/videos/" + fileName);

        DanceVideo savedVideo = videoRepository.save(video);
        logger.info("Saved video metadata to MongoDB: {}", savedVideo.getId());
        return savedVideo;
    }

    @DeleteMapping("/{id}")
    public String deleteVideo(@PathVariable String id) {
        logger.info("Deleting video with ID: {}", id);
        if (videoRepository.existsById(id)) {
            DanceVideo video = videoRepository.findById(id).orElse(null);
            if (video != null && video.getVideoUrl() != null) {
                File file = new File(UPLOAD_DIR + video.getVideoUrl().replace("/videos/", ""));
                if (file.exists()) {
                    boolean deleted = file.delete();
                    logger.info("Deleted video file {}: {}", file.getAbsolutePath(), deleted);
                } else {
                    logger.warn("Video file not found for deletion: {}", file.getAbsolutePath());
                }
            }
            videoRepository.deleteById(id);
            logger.info("Deleted video metadata from MongoDB: {}", id);
            return "Video with ID " + id + " has been deleted.";
        } else {
            logger.warn("Video not found for deletion: {}", id);
            return "Video with ID " + id + " not found.";
        }
    }

    @PutMapping("/{id}")
    public DanceVideo updateVideo(@PathVariable String id, @RequestBody DanceVideo updatedVideo) {
        logger.info("Updating video with ID: {}", id);
        return videoRepository.findById(id)
                .map(existingVideo -> {
                    // Only update fields that are provided in the request body
                    if (updatedVideo.getTitle() != null) {
                        existingVideo.setTitle(updatedVideo.getTitle());
                    }
                    if (updatedVideo.getStyle() != null) {
                        existingVideo.setStyle(updatedVideo.getStyle());
                    }
                    if (updatedVideo.getDifficulty() != null) {
                        existingVideo.setDifficulty(updatedVideo.getDifficulty());
                    }
                    if (updatedVideo.getVideoUrl() != null) {
                        existingVideo.setVideoUrl(updatedVideo.getVideoUrl());
                    }
                    if (updatedVideo.getAudio() != null) {
                        existingVideo.setAudio(updatedVideo.getAudio());
                    }
                    DanceVideo savedVideo = videoRepository.save(existingVideo);
                    logger.info("Updated video metadata in MongoDB: {}", id);
                    return savedVideo;
                })
                .orElseThrow(() -> {
                    logger.error("Video not found for update: {}", id);
                    return new RuntimeException("Video not found with id: " + id);
                });
    }

    @PostMapping("/{id}/like")
    public DanceVideo likeVideo(@PathVariable String id, @RequestBody LikeRequest request) {
        logger.info("Processing like request for video ID: {}, action: {}", id, request.getAction());
        return videoRepository.findById(id)
                .map(video -> {
                    if ("like".equals(request.getAction())) {
                        video.setLikes(video.getLikes() + 1);
                        logger.debug("Incremented likes for video ID: {}. New count: {}", id, video.getLikes());
                    } else if ("unlike".equals(request.getAction())) {
                        video.setLikes(video.getLikes() - 1);
                        logger.debug("Decremented likes for video ID: {}. New count: {}", id, video.getLikes());
                    }
                    DanceVideo savedVideo = videoRepository.save(video);
                    return savedVideo;
                })
                .orElseThrow(() -> {
                    logger.error("Video not found for like: {}", id);
                    return new RuntimeException("Video not found with id: " + id);
                });
    }

    @PostMapping("/{id}/dislike")
    public DanceVideo dislikeVideo(@PathVariable String id, @RequestBody LikeRequest request) {
        logger.info("Processing dislike request for video ID: {}, action: {}", id, request.getAction());
        return videoRepository.findById(id)
                .map(video -> {
                    if ("dislike".equals(request.getAction())) {
                        video.setDislikes(video.getDislikes() + 1);
                        logger.debug("Incremented dislikes for video ID: {}. New count: {}", id, video.getDislikes());
                    } else if ("undislike".equals(request.getAction())) {
                        video.setDislikes(video.getDislikes() - 1);
                        logger.debug("Decremented dislikes for video ID: {}. New count: {}", id, video.getDislikes());
                    }
                    DanceVideo savedVideo = videoRepository.save(video);
                    return savedVideo;
                })
                .orElseThrow(() -> {
                    logger.error("Video not found for dislike: {}", id);
                    return new RuntimeException("Video not found with id: " + id);
                });
    }

    @GetMapping("/{id}/comments")
    public List<Comment> getComments(@PathVariable String id) {
        logger.info("Fetching comments for video ID: {}", id);
        return videoRepository.findById(id)
                .map(DanceVideo::getComments)
                .orElseThrow(() -> {
                    logger.error("Video not found for comments: {}", id);
                    return new RuntimeException("Video not found with id: " + id);
                });
    }

    @PostMapping("/{id}/comments")
    public Comment addComment(@PathVariable String id, @RequestBody CommentRequest request) {
        logger.info("Adding comment to video ID: {}", id);
        return videoRepository.findById(id)
                .map(video -> {
                    Comment comment = new Comment(request.getText());
                    video.addComment(comment);
                    videoRepository.save(video);
                    logger.debug("Added comment to video ID: {}. Comment: {}", id, comment.getText());
                    return comment;
                })
                .orElseThrow(() -> {
                    logger.error("Video not found for adding comment: {}", id);
                    return new RuntimeException("Video not found with id: " + id);
                });
    }

    @PutMapping("/{videoId}/comments/{commentId}")
    public Comment updateComment(@PathVariable String videoId, @PathVariable String commentId, @RequestBody CommentRequest request) {
        logger.info("Updating comment ID: {} on video ID: {}", commentId, videoId);
        return videoRepository.findById(videoId)
                .map(video -> {
                    List<Comment> comments = video.getComments();
                    for (Comment comment : comments) {
                        if (comment.getId().equals(commentId)) {
                            comment.setText(request.getText());
                            videoRepository.save(video);
                            logger.debug("Updated comment: {}", commentId);
                            return comment;
                        }
                    }
                    throw new RuntimeException("Comment not found with id: " + commentId);
                })
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + videoId));
    }

    @DeleteMapping("/{videoId}/comments/{commentId}")
    public String deleteComment(@PathVariable String videoId, @PathVariable String commentId) {
        logger.info("Deleting comment ID: {} from video ID: {}", commentId, videoId);
        return videoRepository.findById(videoId)
                .map(video -> {
                    List<Comment> comments = video.getComments();
                    boolean removed = comments.removeIf(c -> c.getId().equals(commentId));
                    if (removed) {
                        videoRepository.save(video);
                        logger.debug("Deleted comment: {}", commentId);
                        return "Comment with ID " + commentId + " has been deleted.";
                    } else {
                        throw new RuntimeException("Comment not found with id: " + commentId);
                    }
                })
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + videoId));
    }
}

// Request classes for like/dislike and comment
class LikeRequest {
    private String action;

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}

class CommentRequest {
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}