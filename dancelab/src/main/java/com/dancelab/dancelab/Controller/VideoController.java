package com.dancelab.dancelab.Controller;

import com.dancelab.dancelab.Model.DanceVideo;
import com.dancelab.dancelab.repository.DanceVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private DanceVideoRepository videoRepository;

    private static final String UPLOAD_DIR = "uploads/videos/";

    @GetMapping
    public List<DanceVideo> getVideos(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String style,
            @RequestParam(required = false) String difficulty) {
        if (title != null) return videoRepository.findByTitleContaining(title);
        if (style != null) return videoRepository.findByStyle(style);
        if (difficulty != null) return videoRepository.findByDifficulty(difficulty);
        return videoRepository.findAll();
    }

    @PostMapping
    public DanceVideo addVideo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("difficulty") String difficulty,
            @RequestParam("style") String style) throws IOException {
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR, fileName);
        Files.write(filePath, file.getBytes());

        DanceVideo video = new DanceVideo();
        video.setTitle(title);
        video.setDifficulty(difficulty);
        video.setStyle(style);
        video.setVideoUrl("/videos/" + fileName);

        return videoRepository.save(video);
    }

    @DeleteMapping("/{id}")
    public String deleteVideo(@PathVariable String id) {
        if (videoRepository.existsById(id)) {
            DanceVideo video = videoRepository.findById(id).orElse(null);
            if (video != null && video.getVideoUrl() != null) {
                File file = new File(UPLOAD_DIR + video.getVideoUrl().replace("/videos/", ""));
                if (file.exists()) {
                    file.delete();
                }
            }
            videoRepository.deleteById(id);
            return "Video with ID " + id + " has been deleted.";
        } else {
            return "Video with ID " + id + " not found.";
        }
    }

    @PutMapping("/{id}")
    public DanceVideo updateVideo(@PathVariable String id, @RequestBody DanceVideo updatedVideo) {
        return videoRepository.findById(id)
                .map(existingVideo -> {
                    existingVideo.setTitle(updatedVideo.getTitle());
                    existingVideo.setStyle(updatedVideo.getStyle());
                    existingVideo.setDifficulty(updatedVideo.getDifficulty());
                    existingVideo.setVideoUrl(updatedVideo.getVideoUrl());
                    existingVideo.setAudio(updatedVideo.getAudio());
                    return videoRepository.save(existingVideo);
                })
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + id));
    }
}