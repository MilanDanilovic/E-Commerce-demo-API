package com.naprednebaze.mongodb.repository;

import com.naprednebaze.mongodb.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends MongoRepository<User, String> {
        User findByUsernameAndPassword(@Param("username") String username, @Param("password")String password);
        User findByUsername(@Param("username")String username);
}
