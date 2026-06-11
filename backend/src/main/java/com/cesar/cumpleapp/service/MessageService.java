package com.cesar.cumpleapp.service;

import com.cesar.cumpleapp.dto.MessageRequest;
import com.cesar.cumpleapp.entity.Event;
import com.cesar.cumpleapp.entity.Message;
import com.cesar.cumpleapp.entity.User;
import com.cesar.cumpleapp.repository.EventRepository;
import com.cesar.cumpleapp.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final EventRepository eventRepository;

    public MessageService(
            MessageRepository messageRepository,
            EventRepository eventRepository) {

        this.messageRepository = messageRepository;
        this.eventRepository = eventRepository;
    }

    public Message createMessage(String slug, MessageRequest request) {

        Event event = eventRepository.findBySlug(slug)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        User user = event.getOwner();

        Message message = new Message();

        message.setUser(user);
        message.setFirstName(request.getFirstName());
        message.setLastName(request.getLastName());
        message.setRelationship(request.getRelationship());
        message.setMessage(request.getMessage());
        message.setPhotoUrl(request.getPhotoUrl());
        message.setVideoUrl(request.getVideoUrl());
        message.setApproved(true);
        message.setCreatedAt(LocalDateTime.now());

        return messageRepository.save(message);
    }
}