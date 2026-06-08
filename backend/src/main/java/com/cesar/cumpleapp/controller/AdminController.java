package com.cesar.cumpleapp.controller;

import com.cesar.cumpleapp.dto.CreateEventRequest;
import com.cesar.cumpleapp.dto.UserResponse;
import com.cesar.cumpleapp.service.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
//@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create-event")
    public UserResponse createEvent(@RequestBody CreateEventRequest request) {
        return userService.createEvent(request);
    }
}