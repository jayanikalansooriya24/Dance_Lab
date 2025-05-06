package com.dancelab.dancelab.repository;

import com.dancelab.dancelab.Model.DanceVideo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DanceVideoRepository extends MongoRepository<DanceVideo, String> {
    List<DanceVideo> findByTitleContaining(String title);
    List<DanceVideo> findByStyle(String style);
    List<DanceVideo> findByDifficulty(String difficulty);
    

}