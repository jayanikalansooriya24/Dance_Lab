package com.dancelab.dancelab.Controller;

import com.dancelab.dancelab.Model.DanceVideo;
import com.dancelab.dancelab.repository.DanceVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "*") // Optional: useful if you're testing from frontend like React/Postman
public class VideoController {

    @Autowired
    private DanceVideoRepository videoRepository;

    // GET all or filtered videos
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

    // POST to add new video
    @PostMapping
    public DanceVideo addVideo(@RequestBody DanceVideo video) {
        return videoRepository.save(video);
    }

    // DELETE video by ID
    @DeleteMapping("/{id}")
    public String deleteVideo(@PathVariable String id) {
        if (videoRepository.existsById(id)) {
            videoRepository.deleteById(id);
            return "Video with ID " + id + " has been deleted.";
        } else {
            return "Video with ID " + id + " not found.";
        }
    }
    // PUT (Update) video by ID
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
