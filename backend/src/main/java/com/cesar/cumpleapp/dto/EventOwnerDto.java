package com.cesar.cumpleapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EventOwnerDto {

    private Long userId;
    private String email;
    private Long eventId;
    private String eventName;
    private String slug;
}