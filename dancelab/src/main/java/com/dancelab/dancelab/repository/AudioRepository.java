package com.dancelab.dancelab.repository;

import com.dancelab.dancelab.Model.Audio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AudioRepository extends JpaRepository<Audio, Long> {

    // Optional custom queries
    List<Audio> findByTitleContaining(String title);
    List<Audio> findByGenre(String genre);
}
