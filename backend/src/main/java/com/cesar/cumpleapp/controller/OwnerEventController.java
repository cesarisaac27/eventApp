package com.cesar.cumpleapp.controller;

import com.cesar.cumpleapp.dto.EventResponse;
import com.cesar.cumpleapp.service.EventService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/owner")
public class OwnerEventController {

    private final EventService eventService;

    public OwnerEventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/event")
    public EventResponse getMyEvent(Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        return eventService.getByOwnerId(userId);
    }
}