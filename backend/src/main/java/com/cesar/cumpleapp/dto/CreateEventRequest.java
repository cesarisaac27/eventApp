package com.cesar.cumpleapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateEventRequest {

    private String email;
    private String password;

    private String eventName;

    private String slug;
}