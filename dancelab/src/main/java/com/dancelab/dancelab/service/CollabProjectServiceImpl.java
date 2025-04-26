package com.dancelab.dancelab.service;

import com.dancelab.dancelab.model.CollabProject;
import com.dancelab.dancelab.repository.CollabProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollabProjectServiceImpl implements CollabProjectService {

    @Autowired
    private CollabProjectRepository repository;

    @Override
    public CollabProject createProject(CollabProject project) {
        return repository.save(project);
    }

    @Override
    public List<CollabProject> getAllProjects() {
        return repository.findAll();
    }

    @Override
    public CollabProject updateProject(Long id, CollabProject updatedProject) {
        CollabProject project = repository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        project.setProjectTitle(updatedProject.getProjectTitle());
        project.setDescription(updatedProject.getDescription());
        project.setStartDate(updatedProject.getStartDate());
        project.setEndDate(updatedProject.getEndDate());
        project.setRoles(updatedProject.getRoles());
        project.setCollaborators(updatedProject.getCollaborators());
        project.setCompleted(updatedProject.isCompleted());
        return repository.save(project);
    }

    @Override
    public void deleteProject(Long id) {
        repository.deleteById(id);
    }
}
