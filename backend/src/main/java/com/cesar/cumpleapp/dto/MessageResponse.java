package com.cesar.cumpleapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MessageResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String relationship;
    private String message;
    private String photoUrl;
    private String videoUrl;
    private LocalDateTime createdAt;
}