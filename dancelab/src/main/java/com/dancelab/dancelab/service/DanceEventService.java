package com.dancelab.dancelab.service;

import java.util.List;

import com.dancelab.dancelab.model.DanceEvent;

public interface DanceEventService {
    DanceEvent createEvent(DanceEvent event);
    List<DanceEvent> getAllEvents();
    DanceEvent updateEvent(String id, DanceEvent updatedEvent);
    void deleteEvent(String id);
}

