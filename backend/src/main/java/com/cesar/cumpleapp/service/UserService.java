package com.cesar.cumpleapp.service;

import com.cesar.cumpleapp.dto.*;
import com.cesar.cumpleapp.entity.User;
import com.cesar.cumpleapp.repository.UserRepository;
import com.cesar.cumpleapp.security.JwtService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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

        user.setRole("SUPER_ADMIN");

        user.setActive(true);

        user.setCreatedAt(LocalDateTime.now());

        User saved = userRepository.save(user);

        return new UserResponse(saved.getId(), saved.getEmail(), saved.getRole());
    }

    public String login(LoginRequest request) {

        String emailRequest = request.getEmail();
        String passwordRequest = request.getPassword();

        User user = userRepository.findByEmail(emailRequest).orElseThrow(() ->
                                new RuntimeException("User not found"));

        if (!encoder.matches(passwordRequest, user.getPasswordHash())) {

            throw new RuntimeException("Invalid credentials");
        }

        return jwtService.generateToken(user.getEmail(), user.getId());
    }

    /*public UserResponse createEventOwner(CreateEventOwnerRequest request) {

        String eventOwnerEmailRequest = request.getEmail();
        String eventOwnerPasswordRequest = request.getPassword();

        if (userRepository.existsByEmail(eventOwnerEmailRequest)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setEmail(eventOwnerEmailRequest);
        user.setPasswordHash(encoder.encode(eventOwnerPasswordRequest));
        user.setRole("EVENT_OWNER");
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        User saved = userRepository.save(user);

        return new UserResponse(saved.getId(), saved.getEmail(), saved.getRole());
    }*/

    public UserResponse getUser(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(user.getId(), user.getEmail(), user.getRole());
    }

    public UserResponse getUserByEmail(String email) {

        User user = userRepository.findByEmail(email).orElseThrow(() ->
                    new RuntimeException("User not found"));

        return new UserResponse(user.getId(), user.getEmail(), user.getRole());
    }
}