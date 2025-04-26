package com.dancelab.dancelab.repository;

import com.dancelab.dancelab.model.DanceEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DanceEventRepository extends JpaRepository<DanceEvent, Long> {
}
