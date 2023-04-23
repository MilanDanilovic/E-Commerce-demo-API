package com.naprednebaze.mongodb.service;

import com.naprednebaze.mongodb.model.User;
import com.naprednebaze.mongodb.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Collection;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Collection<User> getAllUsers(){
       return userRepository.findAll();
    }

    public void addUser (User user) {
        userRepository.insert(user);
    }

    public void getLogin(String username, String password){
        User user = userRepository.findByUsernameAndPassword(username,password);
        if(user == null) {
            User userWithUsername = userRepository.findByUsername(username);
            if(userWithUsername == null){
                throw new IllegalStateException("User does not exist");
            }else {
                throw new IllegalArgumentException("Wrong password");
            }
        }
    }

    public void deleteAll() {
        userRepository.deleteAll();
    }

    public void deleteUser(String username){
        User user = userRepository.findByUsername(username);
        userRepository.delete(user);
    }

    public User getUser (String username) {
        return userRepository.findByUsername(username);
    }

    public void updateUser(String username,String firstName, String lastName){
        User user = userRepository.findByUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        userRepository.save(user);
    }

    public void updateUserPassword(String username,String password){
        User user = userRepository.findByUsername(username);
        user.setPassword(password);
        userRepository.save(user);
    }}
