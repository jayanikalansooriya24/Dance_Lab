package com.dancelab.dancelab.service;

import com.dancelab.dancelab.model.DanceEvent;
import java.util.List;

public interface DanceEventService {
    DanceEvent createEvent(DanceEvent event);
    List<DanceEvent> getAllEvents();
    DanceEvent updateEvent(Long id, DanceEvent updatedEvent);
    void deleteEvent(Long id);
}
