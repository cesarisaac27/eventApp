package com.cesar.cumpleapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class EventResponse {

    private String eventName;
    private String eventDescription;
    private String quote;
    private String coverImageUrl;
    private String musicUrl;
    private String slug;
    private boolean active;

    // constructor
    // getters
}