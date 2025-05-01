package com.dancelab.dancelab.Model;

import org.springframework.data.annotation.Id;

public class Comment {
    @Id
    private String id;
    private String text;

    // Constructors
    public Comment() {}

    public Comment(String text) {
        this.text = text;
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
}