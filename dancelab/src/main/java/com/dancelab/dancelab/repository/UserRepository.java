package com.dancelab.dancelab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dancelab.dancelab.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByGoogleId(String googleId);
}