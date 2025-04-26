package com.dancelab.dancelab.repository;

import com.dancelab.dancelab.model.CollabProject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollabProjectRepository extends JpaRepository<CollabProject, Long> {
}
