package com.cesar.cumpleapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequest {

    private String slug;

    private String firstName;

    private String lastName;

    private String relationship;

    private String message;

    private String photoUrl;

    private String videoUrl;

    // getters/setters
}