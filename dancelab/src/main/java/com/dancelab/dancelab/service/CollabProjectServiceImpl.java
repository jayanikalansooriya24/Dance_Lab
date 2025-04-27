package com.dancelab.dancelab.service;

import com.dancelab.dancelab.model.CollabProject;
import com.dancelab.dancelab.repository.CollabProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollabProjectServiceImpl implements CollabProjectService {

    private final CollabProjectRepository collabProjectRepository;

    @Autowired
    public CollabProjectServiceImpl(CollabProjectRepository collabProjectRepository) {
        this.collabProjectRepository = collabProjectRepository;
    }

    @Override
    public CollabProject createProject(CollabProject project) {
        return collabProjectRepository.save(project);
    }

    @Override
    public List<CollabProject> getAllProjects() {
        return collabProjectRepository.findAll();
    }

    @Override
    public CollabProject updateProject(String id, CollabProject updatedProject) {
        CollabProject existingProject = collabProjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        existingProject.setProjectTitle(updatedProject.getProjectTitle());
        existingProject.setDescription(updatedProject.getDescription());
        existingProject.setStartDate(updatedProject.getStartDate());
        existingProject.setEndDate(updatedProject.getEndDate());
        existingProject.setRoles(updatedProject.getRoles());
        existingProject.setCollaborators(updatedProject.getCollaborators());
        existingProject.setCompleted(updatedProject.isCompleted());

        return collabProjectRepository.save(existingProject);
    }

    @Override
    public void deleteProject(String id) {
        collabProjectRepository.deleteById(id);
    }
}
