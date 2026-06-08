package com.cesar.cumpleapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String relationship;

    private String message;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "video_url")
    private String videoUrl;

    private Boolean approved;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}