package com.dancelab.dancelab.service;

import com.dancelab.dancelab.model.DanceEvent;
import com.dancelab.dancelab.repository.DanceEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DanceEventServiceImpl implements DanceEventService {

    @Autowired
    private DanceEventRepository repository;

    @Override
    public DanceEvent createEvent(DanceEvent event) {
        return repository.save(event);
    }

    @Override
    public List<DanceEvent> getAllEvents() {
        return repository.findAll();
    }

    @Override
    public DanceEvent updateEvent(Long id, DanceEvent updatedEvent) {
        DanceEvent existing = repository.findById(id).orElseThrow();
        existing.setTitle(updatedEvent.getTitle());
        existing.setLocation(updatedEvent.getLocation());
        existing.setEventDate(updatedEvent.getEventDate());
        existing.setJudgingCriteria(updatedEvent.getJudgingCriteria());
        existing.setSchedule(updatedEvent.getSchedule());
        existing.setCanceled(updatedEvent.isCanceled());
        return repository.save(existing);
    }

    @Override
    public void deleteEvent(Long id) {
        repository.deleteById(id);
    }
}
