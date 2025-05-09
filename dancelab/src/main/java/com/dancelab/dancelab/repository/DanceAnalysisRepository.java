package com.dancelab.dancelab.repository;

import com.dancelab.dancelab.model.DanceAnalysis;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DanceAnalysisRepository extends MongoRepository<DanceAnalysis, String> {
}
