package com.dancelab.dancelab.controller;

import com.dancelab.dancelab.model.DanceEvent;
import com.dancelab.dancelab.service.DanceEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class DanceEventController {

    @Autowired
    private DanceEventService service;

    @PostMapping
    public DanceEvent createEvent(@RequestBody DanceEvent event) {
        return service.createEvent(event);
    }

    @GetMapping
    public List<DanceEvent> getAllEvents() {
        return service.getAllEvents();
    }

    @PutMapping("/{id}")
    public DanceEvent updateEvent(@PathVariable Long id, @RequestBody DanceEvent updated) {
        return service.updateEvent(id, updated);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        service.deleteEvent(id);
    }
}
