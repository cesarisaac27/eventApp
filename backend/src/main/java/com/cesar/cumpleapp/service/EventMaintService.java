package com.cesar.cumpleapp.service;

import com.cesar.cumpleapp.dto.CreateEventOwnerRequest;
import com.cesar.cumpleapp.entity.Event;
import com.cesar.cumpleapp.entity.User;
import com.cesar.cumpleapp.repository.EventRepository;
import com.cesar.cumpleapp.repository.UserRepository;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Clase: EventService
 *
 * Responsabilidad:
 * Crear y administrar eventos.
 *
 * Flujo:
 * React Admin Dashboard
 * -> POST /api/admin/event-owner
 * -> AdminController
 * -> EventService
 * -> UserRepository
 * -> EventRepository
 * -> PostgreSQL
 */

@Service
public class EventMaintService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public EventMaintService(EventRepository eventRepository, UserRepository userRepository) {

        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    /**
     * create an Event Owner 
     * create an event
     *
     * @param request 
     */
    public void createEventOwnerAndEvent(CreateEventOwnerRequest request) {

        String requestEmail = request.getEmail();
        String requestSlug = request.getSlug();
        String requestPassword = request.getPassword();
        

        if (userRepository.existsByEmail(requestEmail)) {

            throw new RuntimeException("Email already exists");
        }

        if (eventRepository.existsBySlug(requestSlug)) {

            throw new RuntimeException("Slug already exists");
        }

        User user = new User();

        user.setEmail(requestEmail);
        user.setPasswordHash(encoder.encode(requestPassword));
        user.setRole("EVENT_OWNER");
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        Event event = new Event();

        event.setOwner(savedUser);
        event.setEventName(request.getEventName());
        event.setSlug(request.getSlug());
        event.setActive(true);
        event.setCreatedAt(LocalDateTime.now());

        eventRepository.save(event);
    }

    

    /**
    * Obtiene todos los eventos registrados.
    */
    public List<Event> getAllEvents() {

        return eventRepository.findAll();
    }

    /**
 * Obtiene un evento por su slug.
 *
 * @param slug identificador único del evento.
 */
    public Event getEventBySlug(String slug) {

        return eventRepository.findBySlug(slug).orElseThrow(() ->
                    new RuntimeException("Event not found"));
    }
}