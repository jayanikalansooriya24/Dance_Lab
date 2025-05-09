package com.dancelab.dancelab.service;

import com.dancelab.dancelab.Model.DanceEvent;
import java.util.List;

public interface DanceEventService {
    DanceEvent createEvent(DanceEvent event);
    List<DanceEvent> getAllEvents();
    DanceEvent updateEvent(String id, DanceEvent updatedEvent);
    void deleteEvent(String id);
}

