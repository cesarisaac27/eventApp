package com.cesar.cumpleapp.repository;

import com.cesar.cumpleapp.entity.Event;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<Event> findByOwnerId(Long ownerId);

}