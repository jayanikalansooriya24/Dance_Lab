package com.dancelab.dancelab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dancelab.dancelab.model.DanceAnalysis;

public interface DanceAnalysisRepository extends MongoRepository<DanceAnalysis, String> {
}
