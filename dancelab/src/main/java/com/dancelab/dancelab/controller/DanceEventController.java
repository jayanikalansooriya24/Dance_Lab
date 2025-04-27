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
    public DanceEvent createEvent(@RequestBody DanceEvent event) {//Create
        return service.createEvent(event);
    }

    @GetMapping
    public List<DanceEvent> getAllEvents() {//read
        return service.getAllEvents();
    }

    @PutMapping("/{id}")
    public DanceEvent updateEvent(@PathVariable String id, @RequestBody DanceEvent updated) {//update
        return service.updateEvent(id, updated);
    }

    @DeleteMapping("/{id}")//delete
    public void deleteEvent(@PathVariable String id) {
        service.deleteEvent(id);
    }
}
