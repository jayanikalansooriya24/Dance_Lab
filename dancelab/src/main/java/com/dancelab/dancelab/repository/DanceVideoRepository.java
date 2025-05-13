package com.dancelab.dancelab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dancelab.dancelab.model.DanceVideo;

import java.util.List;

public interface DanceVideoRepository extends MongoRepository<DanceVideo, String> {
    List<DanceVideo> findByTitleContaining(String title);
    List<DanceVideo> findByStyle(String style);
    List<DanceVideo> findByDifficulty(String difficulty);
    

}