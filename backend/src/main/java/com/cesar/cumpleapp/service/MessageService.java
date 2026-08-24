package com.cesar.cumpleapp.service;

import com.cesar.cumpleapp.dto.MessageRequest;
import com.cesar.cumpleapp.entity.Event;
import com.cesar.cumpleapp.entity.Message;
import com.cesar.cumpleapp.entity.User;
import com.cesar.cumpleapp.repository.EventRepository;
import com.cesar.cumpleapp.repository.MessageRepository;
import org.springframework.stereotype.Service;
import com.cesar.cumpleapp.dto.MessageResponse;
import java.util.List;
import java.time.LocalDateTime;

@Service

public class MessageService {

    private final MessageRepository messageRepository;
    private final EventRepository eventRepository;

    public MessageService(MessageRepository messageRepository, EventRepository eventRepository) {
        this.messageRepository = messageRepository;
        this.eventRepository = eventRepository;
    }

    public Message createMessage(String slug, MessageRequest request) {

        Event event = eventRepository.findBySlug(slug).orElseThrow(() ->
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

    public List<MessageResponse> getMessagesBySlug(String slug) {

        Event event = eventRepository.findBySlug(slug).orElseThrow(() ->
                    new RuntimeException("Event not found")
            );

        User user = event.getOwner();


        List<MessageResponse> messages = messageRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
            .stream().map(message -> new MessageResponse(
                    message.getId(),
                    message.getFirstName(),
                    message.getLastName(),
                    message.getRelationship(),
                    message.getMessage(),
                    message.getPhotoUrl(),
                    message.getVideoUrl(),
                    message.getCreatedAt(),
                    message.getApproved()
            )).toList();
        
            return messages;

    }


    public List<MessageResponse> getApprovedMessagesBySlug(String slug) {

        Event event = eventRepository.findBySlug(slug).orElseThrow(() ->
                    new RuntimeException("Event not found"));

        User user = event.getOwner();

        List<MessageResponse> messages = messageRepository.findByUserIdAndApprovedTrueOrderByCreatedAtDesc(user.getId())
            .stream().map(message -> new MessageResponse(
                    message.getId(),
                    message.getFirstName(),
                    message.getLastName(),
                    message.getRelationship(),
                    message.getMessage(),
                    message.getPhotoUrl(),
                    message.getVideoUrl(),
                    message.getCreatedAt(),
                    message.getApproved()
            )).toList();
        
            return messages;

    }

    public MessageResponse toggleApproval(String slug, Long messageId, Long userId) {

        Event event = eventRepository.findBySlug(slug).orElseThrow(() ->
                    new RuntimeException("Event not found"));


        Message message = messageRepository.findById(messageId).orElseThrow(() ->
                    new RuntimeException("Message not found"));


        /*
        * Make sure the authenticated user
        * is the owner of the event.
        */

        if (!event.getOwner().getId().equals(userId)) {

            throw new RuntimeException("You are not the owner of this event");
        }


    /*
     * Toggle approval
     */
        message.setApproved(!Boolean.TRUE.equals(message.getApproved()));


        Message savedMessage = messageRepository.save(message);


        return new MessageResponse(
            savedMessage.getId(),
            savedMessage.getFirstName(),
            savedMessage.getLastName(),
            savedMessage.getRelationship(),
            savedMessage.getMessage(),
            savedMessage.getPhotoUrl(),
            savedMessage.getVideoUrl(),
            savedMessage.getCreatedAt(),
            savedMessage.getApproved()
        );
    }



    public void deleteMessage(String slug, Long messageId) {

        Event event = eventRepository.findBySlug(slug).orElseThrow(() -> 
                    new RuntimeException("Event not found"));

        Message message = messageRepository.findById(messageId).orElseThrow(() ->
                    new RuntimeException("Message not found"));

        if (!message.getUser().getId().equals(event.getOwner().getId())) {

            throw new RuntimeException("Message does not belong to this event");
        }

        messageRepository.delete(message);
        }







}