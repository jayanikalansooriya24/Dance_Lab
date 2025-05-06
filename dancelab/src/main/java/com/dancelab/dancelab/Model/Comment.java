package com.dancelab.dancelab.Model;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.UUID;

public class Comment {
    @Id
    private String id;
    private String text;
    private LocalDateTime createdAt;

    // Constructors
    public Comment() {
        this.id = UUID.randomUUID().toString(); // Generate unique ID
        this.createdAt = LocalDateTime.now();
    }

    public Comment(String text) {
        this.id = UUID.randomUUID().toString();
        this.text = text;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}