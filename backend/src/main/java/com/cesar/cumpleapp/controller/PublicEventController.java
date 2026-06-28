package com.cesar.cumpleapp.controller;

import com.cesar.cumpleapp.dto.EventResponse;
import com.cesar.cumpleapp.service.EventService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/events")
public class PublicEventController {

    private final EventService eventService;

    public PublicEventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/{slug}")
    public EventResponse getEvent(@PathVariable String slug) {
        return eventService.getBySlug(slug);
    }
}