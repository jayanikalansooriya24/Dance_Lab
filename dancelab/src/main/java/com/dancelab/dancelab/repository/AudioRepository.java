package com.dancelab.dancelab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.dancelab.dancelab.model.Audio;

import java.util.List;

@Repository
public interface AudioRepository extends MongoRepository<Audio, String> {
    List<Audio> findByTitleContaining(String title);
    List<Audio> findByGenre(String genre);
}
