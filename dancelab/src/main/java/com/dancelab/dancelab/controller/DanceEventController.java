package com.dancelab.dancelab.Controller;

import com.dancelab.dancelab.Model.DanceEvent;
import com.dancelab.dancelab.service.DanceEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")  // Restrict to your frontend URL in development
public class DanceEventController {

    @Autowired
    private DanceEventService service;

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody DanceEvent event) {
        try {
            System.out.println("Received event: " + event.getTitle() + ", Date: " + event.getEventDate());
            DanceEvent createdEvent = service.createEvent(event);
            return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating event: " + e.getMessage());
            return new ResponseEntity<>("Failed to create event. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
     // Global exception handler for this controller
     @ExceptionHandler(Exception.class)
     public ResponseEntity<String> handleException(Exception e) {
         System.err.println("Error: " + e.getMessage());
         return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
     }

    // Get all events
    @GetMapping
    public ResponseEntity<List<DanceEvent>> getAllEvents() {
        try {
            List<DanceEvent> events = service.getAllEvents();
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching events: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update event
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, @RequestBody DanceEvent updatedEvent) {
        try {
            DanceEvent updated = service.updateEvent(id, updatedEvent);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error updating event: " + e.getMessage());
            return new ResponseEntity<>("Failed to update event. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete event
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable String id) {
        try {
            service.deleteEvent(id);
            return new ResponseEntity<>("Event deleted successfully.", HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error deleting event: " + e.getMessage());
            return new ResponseEntity<>("Failed to delete event. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
