package com.dancelab.dancelab.Controller;

import com.dancelab.dancelab.Model.DanceVideo;
import com.dancelab.dancelab.repository.DanceVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private DanceVideoRepository videoRepository;

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

    // POST endpoint to add a new DanceVideo
    @PostMapping
    public DanceVideo addVideo(@RequestBody DanceVideo video) {
        return videoRepository.save(video);  // Saves and returns the saved DanceVideo
    }
}
