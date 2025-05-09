package com.dancelab.dancelab.repository;

import com.dancelab.dancelab.Model.DanceAnalysis;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DanceAnalysisRepository extends MongoRepository<DanceAnalysis, String> {
}
