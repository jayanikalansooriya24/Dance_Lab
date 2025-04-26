package com.dancelab.dancelab.controller;

import com.dancelab.dancelab.model.CollabProject;
import com.dancelab.dancelab.service.CollabProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collab-projects")
@CrossOrigin(origins = "*")
public class CollabProjectController {

    @Autowired
    private CollabProjectService service;

    @PostMapping
    public CollabProject createProject(@RequestBody CollabProject project) {
        return service.createProject(project);
    }

    @GetMapping
    public List<CollabProject> getAllProjects() {
        return service.getAllProjects();
    }

    @PutMapping("/{id}")
    public CollabProject updateProject(@PathVariable Long id, @RequestBody CollabProject updated) {
        return service.updateProject(id, updated);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        service.deleteProject(id);
    }
}
