package com.dancelab.dancelab.service;

import com.dancelab.dancelab.model.CollabProject;
import java.util.List;

public interface CollabProjectService {
    CollabProject createProject(CollabProject project);
    List<CollabProject> getAllProjects();
    CollabProject updateProject(String id, CollabProject updatedProject);
    void deleteProject(String id);
    CollabProject likeProject(String id); // New method for liking a project
}