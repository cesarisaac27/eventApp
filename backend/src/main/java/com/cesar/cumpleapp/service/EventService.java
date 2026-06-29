package com.cesar.cumpleapp.service;

import com.cesar.cumpleapp.dto.EventResponse;
import com.cesar.cumpleapp.entity.Event;
import com.cesar.cumpleapp.repository.EventRepository;
import org.springframework.stereotype.Service;
import com.cesar.cumpleapp.repository.EventRepository; 

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {this.eventRepository = eventRepository;}

    public EventResponse getBySlug(String slug) {

        Event event = eventRepository.findBySlug(slug).orElseThrow(() ->
                    new RuntimeException("Event not found"));

        if (!event.getActive()) {
           throw new RuntimeException("Event inactive");
        }

        return new EventResponse(
            event.getEventName(),
            event.getEventDescription(),
            event.getQuote(),
            event.getCoverImageUrl(),
            event.getMusicUrl(),
            event.getSlug(),
            Boolean.TRUE.equals(event.getActive()),
            event.getEventDate()
        );
    }
}