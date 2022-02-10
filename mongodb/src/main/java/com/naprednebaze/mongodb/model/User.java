package com.naprednebaze.mongodb.model;

import com.naprednebaze.mongodb.model.Enumerations.Role;

import java.util.List;

public class User {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private Role role;
    private List<ShoppingListing> shoppingListings;
}
