package com.dancelab.dancelab.repository;

import com.dancelab.dancelab.model.CollabProject;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CollabProjectRepository extends MongoRepository<CollabProject, String> {
}
