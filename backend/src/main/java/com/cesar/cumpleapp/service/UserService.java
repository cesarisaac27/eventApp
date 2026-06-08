package com.cesar.cumpleapp.service;

import com.cesar.cumpleapp.dto.RegisterRequest;
import com.cesar.cumpleapp.dto.UpdateProfileRequest;
import com.cesar.cumpleapp.dto.UserResponse;
import com.cesar.cumpleapp.entity.User;
import com.cesar.cumpleapp.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.cesar.cumpleapp.security.JwtService;
import java.time.LocalDateTime;

import com.cesar.cumpleapp.dto.CreateEventRequest;
import com.cesar.cumpleapp.dto.LoginRequest;


@Service
public class UserService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();

        user.setEmail(request.getEmail());
        user.setPasswordHash(encoder.encode(request.getPassword()));
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        User saved = userRepository.save(user);

        return new UserResponse(saved.getId(), saved.getEmail(), saved.getSlug());
    }

    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtService.generateToken(user.getEmail(), user.getId());
    }

    public UserResponse updateProfile(Long userId, UpdateProfileRequest request) {

        User user = userRepository.findById(userId).orElseThrow(() ->
                    new RuntimeException("User not found"));

        user.setEventName(request.getEventName());
        user.setEventDescription(request.getEventDescription());
        user.setQuote(request.getQuote());
        user.setCoverImageUrl(request.getCoverImageUrl());
        user.setMusicUrl(request.getMusicUrl());
        user.setSlug(request.getSlug());

        User saved = userRepository.save(user);

        return new UserResponse(saved.getId(), saved.getEmail(), saved.getSlug());
    }

    public UserResponse createEvent(CreateEventRequest request) {

        if(userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if(userRepository.existsBySlug(request.getSlug())) {
            throw new RuntimeException("Slug already exists");
        }

        User user = new User();

        user.setEmail(request.getEmail());
        user.setPasswordHash(encoder.encode(request.getPassword()));
        user.setEventName(request.getEventName());
        user.setSlug(request.getSlug());
        user.setRole("EVENT_ADMIN");
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        User saved = userRepository.save(user);

        return new UserResponse(saved.getId(), saved.getEmail(), saved.getSlug());
    }
}