package com.example.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/events")
public class EventController {

    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventService service;

    @PostMapping("/addEvent")
    public ResponseEntity<?> addEvent(@RequestBody Event event) {
        logger.info("Received add event request - Name: {}", event.getEventName());
        try {
            Event saved = service.createEvent(event);
            logger.info("Event saved successfully with ID: {}", saved.getId());
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            logger.error("Error saving event: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to save event"));
        }
    }

    @GetMapping("/showEvents")
    public ResponseEntity<List<Event>> getAllEvents() {
        logger.debug("Fetching all events");
        List<Event> events = service.getAllEvents();
        logger.info("Retrieved {} events", events.size());
        return ResponseEntity.ok(events);
    }

    @GetMapping("/showEvent/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        logger.debug("Fetching event with ID: {}", id);
        if (id == null) {
            return ResponseEntity.status(400).body(Map.of("error", "Event ID cannot be null"));
        }
        Event event = service.getEventById(id);
        if (event == null) {
            logger.warn("Event not found with ID: {}", id);
            return ResponseEntity.status(404).body(Map.of("error", "Event not found"));
        }
        return ResponseEntity.ok(event);
    }

    @PutMapping("/updateEvent/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        logger.info("Updating event with ID: {}", id);
        if (id == null) {
            return ResponseEntity.status(400).body(Map.of("error", "Event ID cannot be null"));
        }
        Event existing = service.getEventById(id);
        if (existing == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Event not found"));
        }
        existing.setEventName(event.getEventName());
        existing.setStartDate(event.getStartDate());
        existing.setEndDate(event.getEndDate());
        Event updated = service.createEvent(existing);
        logger.info("Event updated successfully with ID: {}", updated.getId());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/deleteEvent/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        logger.info("Deleting event with ID: {}", id);
        if (id == null) {
            return ResponseEntity.status(400).body(Map.of("error", "Event ID cannot be null"));
        }
        service.deleteEvent(id);
        return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));
    }
}
