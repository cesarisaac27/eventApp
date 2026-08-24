package com.cesar.cumpleapp.controller;

import org.springframework.security.core.Authentication;
import com.cesar.cumpleapp.dto.MessageRequest;
import com.cesar.cumpleapp.entity.Message;
import com.cesar.cumpleapp.service.MessageService;
import com.cesar.cumpleapp.dto.MessageResponse;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/events")

public class PublicMessageController {

    private final MessageService messageService;

    public PublicMessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/{slug}/messages")
    /*
    Endpoint dedicated to create a message for event
    */
    public Message createMessage(@PathVariable String slug, @RequestBody MessageRequest request) {

        return messageService.createMessage(slug, request);
    }

    @GetMapping("/{slug}/RetrieveMessages")
    /*
    endpoint dedicated to retrieve messages for the event owner dashboard
    */
    public List<MessageResponse> getMessages(@PathVariable String slug) {
        return messageService.getMessagesBySlug(slug);
    }
    
    /*
    Retrieve approved messages

    Show approved message, used in show memories 
    input Slug 
     */
    @GetMapping("/{slug}/RetrieveApprovedMessages")
    public List<MessageResponse> getApprovedMessages(@PathVariable String slug) {
        return messageService.getApprovedMessagesBySlug(slug);
    }
}