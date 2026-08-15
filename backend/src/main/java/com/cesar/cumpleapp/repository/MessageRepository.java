package com.cesar.cumpleapp.repository;

import com.cesar.cumpleapp.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository
        extends JpaRepository<Message, Long> {

    List<Message> findByUserId(Long userId);
    List<Message> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Message> findByUserIdAndApprovedTrueOrderByCreatedAtDesc(Long userId);


    /*
    Example using @query
    @Query("""
    SELECT m
    FROM Message m
    WHERE m.user.id = :userId
    AND m.approved = true
    ORDER BY m.createdAt DESC
    """)

    List<Message> findApprovedMessagesByUserId(@Param("userId") Long userId);
    
    
    */
    
}