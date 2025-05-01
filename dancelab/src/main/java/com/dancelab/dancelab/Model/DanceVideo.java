package com.dancelab.dancelab.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// This will create a MongoDB collection named "dance_videos"
@Document(collection = "dance_videos")
public class DanceVideo {

    @Id
    private String id;
    private String title;
    private String style;
    private String difficulty;
    private String videoUrl;  // <-- ADD this field
    private Audio audio;

    // Constructors
    public DanceVideo() {}

    public DanceVideo(String title, String style, String difficulty, String videoUrl) {
        this.title = title;
        this.style = style;
        this.difficulty = difficulty;
        this.videoUrl = videoUrl;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    // Ensure that this setAudio method exists
    public Audio getAudio() {
        return audio;
    }

    public void setAudio(Audio audio) {
        this.audio = audio;
    }
    
}

