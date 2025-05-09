package com.dancelab.dancelab.controller;

import com.dancelab.dancelab.model.CollabProject;
import com.dancelab.dancelab.service.CollabProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collab")
@CrossOrigin(origins = "*")
public class CollabProjectController {

    private final CollabProjectService collabProjectService;

    @Autowired
    public CollabProjectController(CollabProjectService collabProjectService) {
        this.collabProjectService = collabProjectService;
    }

    @PostMapping
    public CollabProject createProject(@RequestBody CollabProject project) {
        return collabProjectService.createProject(project);
    }

    @GetMapping
    public List<CollabProject> getAllProjects() {
        return collabProjectService.getAllProjects();
    }

    @PutMapping("/{id}")
    public CollabProject updateProject(@PathVariable String id, @RequestBody CollabProject updatedProject) {
        return collabProjectService.updateProject(id, updatedProject);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable String id) {
        collabProjectService.deleteProject(id);
    }

    @PostMapping("/{id}/like")
    public CollabProject likeProject(@PathVariable String id) {
        return collabProjectService.likeProject(id);
    }
}