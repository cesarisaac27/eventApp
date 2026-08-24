package com.cesar.cumpleapp.controller;

import com.cesar.cumpleapp.dto.EventResponse;
import com.cesar.cumpleapp.dto.MessageResponse;
import com.cesar.cumpleapp.service.EventService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cesar.cumpleapp.service.MessageService;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/owner")
public class OwnerEventController {

    private final EventService eventService;
    private final MessageService messageService;


    public OwnerEventController(EventService eventService, MessageService messageService) {
        this.eventService = eventService;
        this.messageService = messageService;

    }


    @GetMapping("/event")
    public EventResponse getMyEvent(Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        return eventService.getByOwnerId(userId);
    }


    @PatchMapping("/events/{slug}/messages/{id}/approval")
    public MessageResponse toggleApproval(@PathVariable String slug, @PathVariable Long id, Authentication authentication){

        Long userId = (Long) authentication.getPrincipal();

        System.out.println(">>> CONTROLLER TOGGLE APPROVAL");
        System.out.println(">>> SLUG: " + slug);
        System.out.println(">>> MESSAGE ID: " + id);

        return messageService.toggleApproval(slug, id, userId);
    }

     /*
    delete  messages

    Delete selected message
    used in edit messages 
    a deleted messages cannot be restored
    input Slug, message id 
     */
    @DeleteMapping("/events/{slug}/messages/{id}")
    public void deleteMessage(@PathVariable String slug, @PathVariable Long id) {
        messageService.deleteMessage(slug, id);
    }






}