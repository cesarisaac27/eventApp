package com.cesar.cumpleapp.controller;

import com.cesar.cumpleapp.dto.CreateEventOwnerRequest;
import com.cesar.cumpleapp.dto.UserResponse;
import com.cesar.cumpleapp.service.UserService;
import com.cesar.cumpleapp.entity.Event;
import com.cesar.cumpleapp.service.EventMaintService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final EventMaintService eventService;

    public AdminController(EventMaintService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/event-owner")
    public ResponseEntity<?> createOwner(@RequestBody CreateEventOwnerRequest request) {

        eventService.createEventOwnerAndEvent(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEvents() {

        return ResponseEntity.ok(eventService.getAllEvents());
    }
}