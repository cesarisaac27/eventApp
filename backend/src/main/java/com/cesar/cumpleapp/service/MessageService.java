package com.cesar.cumpleapp.service;

import com.cesar.cumpleapp.dto.MessageRequest;
import com.cesar.cumpleapp.entity.Message;
import com.cesar.cumpleapp.entity.User;
import com.cesar.cumpleapp.repository.MessageRepository;
import com.cesar.cumpleapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageService(
            MessageRepository messageRepository,
            UserRepository userRepository
    ) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public Message createMessage(
            String slug,
            MessageRequest request
    ) {

        User user = userRepository.findBySlug(slug)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

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