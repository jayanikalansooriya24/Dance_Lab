package com.dancelab.dancelab.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "collab_projects") // or "collab" if you prefer
public class CollabProject {
    @Id
    private String id;

    private String projectTitle;
    private String description;
    private Date startDate;
    private Date endDate;
    private List<String> roles;
    private List<String> collaborators;
    private boolean completed;

    // Constructors
    public CollabProject() {}

    public CollabProject(String projectTitle, String description, Date startDate, Date endDate,
                         List<String> roles, List<String> collaborators, boolean completed) {
        this.projectTitle = projectTitle;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.roles = roles;
        this.collaborators = collaborators;
        this.completed = completed;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public List<String> getCollaborators() {
        return collaborators;
    }

    public void setCollaborators(List<String> collaborators) {
        this.collaborators = collaborators;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
