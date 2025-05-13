package com.dancelab.dancelab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dancelab.dancelab.model.DanceEvent;

public interface DanceEventRepository extends MongoRepository<DanceEvent, String> {
}
