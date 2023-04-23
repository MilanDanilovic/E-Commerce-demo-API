package com.naprednebaze.mongodb.controller;

import com.naprednebaze.mongodb.model.ShoppingListing;
import com.naprednebaze.mongodb.model.User;
import com.naprednebaze.mongodb.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;


@RestController
@RequestMapping("/rest/mongodb/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(
            value = "/getAll"
    )
    public Collection<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(
            value = "/getUser"
    )
    public User getUser(@RequestParam("username") String username) {
        return userService.getUser(username);
    }

    @PostMapping(
            value = "/addUser",
            produces = {"application/json"}
    )
    public HttpStatus addUser(@RequestBody(required = true) User user) {
        try {
            userService.addUser(user);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    @GetMapping(
            value = "/login"
    )
    public String getLogin(@RequestParam("username")String username, @RequestParam("password")String password) {
       try {
           userService.getLogin(username,password);
       }
       catch (IllegalStateException illegalStateException){
            return "400";
       }
       catch (IllegalArgumentException illegalArgumentException){
            return "203";
       }
       return "200";
    }

    @DeleteMapping(
            value = "/deleteAll",
            produces = {"application/json"}
    )
    public HttpStatus deleteAll() {
        try {
            userService.deleteAll();
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @DeleteMapping(
            value = "/deleteUser",
            produces = {"application/json"}
    )
    public HttpStatus deleteUser(@RequestParam("username")String username) {
        try {
            userService.deleteUser(username);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @PutMapping(
            value = "/updateUser",
            produces = {"application/json"}
    )
    public HttpStatus updateUser(@RequestParam("username")String username, @RequestParam("firstName") String firstname, @RequestParam("lastName") String lastName ) {
        try {
            userService.updateUser(username,firstname,lastName);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @PutMapping(
            value = "/updateUserPassword",
            produces = {"application/json"}
    )
    public HttpStatus updateUserPassword(@RequestParam("username")String username, @RequestParam("password") String password) {
        try {
            userService.updateUserPassword(username,password);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

}
