package com.cesar.cumpleapp.controller;

import com.cesar.cumpleapp.entity.Event;
import com.cesar.cumpleapp.service.EventService;
import com.cesar.cumpleapp.dto.EventResponse;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {

        this.eventService = eventService;
    }

    /**
     * Obtiene la información pública de un evento.
     */
    @GetMapping("/{slug}")
    public EventResponse getEvent(@PathVariable String slug) {

        return eventService.getBySlug(slug);
    }
}