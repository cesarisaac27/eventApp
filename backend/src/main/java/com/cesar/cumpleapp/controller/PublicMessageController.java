package com.cesar.cumpleapp.controller;

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
    public Message createMessage(@PathVariable String slug, @RequestBody MessageRequest request) {

        return messageService.createMessage(slug, request);
    }

    @GetMapping("/{slug}/RetrieveMessages")
    public List<MessageResponse> getMessages(@PathVariable String slug) {
        return messageService.getMessagesBySlug(slug);
    }
}