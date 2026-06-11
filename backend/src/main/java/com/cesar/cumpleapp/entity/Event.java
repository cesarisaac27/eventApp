package com.cesar.cumpleapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor

public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "event_description")
    private String eventDescription;

    private String quote;

    @Column(name = "cover_image_url")
    private String coverImageUrl;

    @Column(name = "music_url")
    private String musicUrl;

    @Column(unique = true)
    private String slug;

    private Boolean active;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}