package com.cesar.cumpleapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

    private String eventName;
    private String eventDescription;
    private String quote;
    private String coverImageUrl;
    private String musicUrl;
    private String slug;
}