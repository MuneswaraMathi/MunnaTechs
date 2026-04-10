package com.example.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository repository;

    public Event createEvent(@NonNull Event event) {
        return repository.save(event);
    }

    public List<Event> getAllEvents() {
        return repository.findAll();
    }

    public Event getEventById(@NonNull Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteEvent(@NonNull Long id) {
        repository.deleteById(id);
    }
}
