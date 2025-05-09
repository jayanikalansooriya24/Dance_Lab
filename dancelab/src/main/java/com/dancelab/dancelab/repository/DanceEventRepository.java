package com.dancelab.dancelab.repository;

import com.dancelab.dancelab.Model.DanceEvent;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DanceEventRepository extends MongoRepository<DanceEvent, String> {
}
