package com.cesar.cumpleapp.controller;

import com.cesar.cumpleapp.dto.RegisterRequest;
import com.cesar.cumpleapp.dto.UpdateProfileRequest;
import com.cesar.cumpleapp.service.UserService;
import com.cesar.cumpleapp.dto.LoginRequest;
import com.cesar.cumpleapp.dto.UserResponse;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
    
    /*@PutMapping("/profile/{id}")
    public UserResponse updateProfile(@PathVariable Long id, @RequestBody UpdateProfileRequest request) {
    return userService.updateProfile(id, request);
    }*/
}
