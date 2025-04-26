package com.dancelab.dancelab.service;

import com.dancelab.dancelab.model.CollabProject;

import java.util.List;

public interface CollabProjectService {
    CollabProject createProject(CollabProject project);
    List<CollabProject> getAllProjects();
    CollabProject updateProject(Long id, CollabProject updatedProject);
    void deleteProject(Long id);
}
