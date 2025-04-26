package com.dancelab.dancelab.repository;

import com.dancelab.dancelab.Model.DanceVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DanceVideoRepository extends JpaRepository<DanceVideo, Long> {
    List<DanceVideo> findByTitleContaining(String title);
    List<DanceVideo> findByStyle(String style);
    List<DanceVideo> findByDifficulty(String difficulty);
}
