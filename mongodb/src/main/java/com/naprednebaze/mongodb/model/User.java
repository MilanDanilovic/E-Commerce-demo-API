package com.naprednebaze.mongodb.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.naprednebaze.mongodb.model.Enumerations.Role;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "user")
public class User {
    @Id
    @JsonProperty("id")
    private ObjectId id;

    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    private String lastName;

    @Indexed(unique = true)
    @JsonProperty("username")
    private String username;

    @Indexed(unique = true)
    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("role")
    private Role role;

    @JsonProperty("shoppingListings")
    private List<ShoppingListing> shoppingListings;

    @JsonProperty("wishList")
    private Wishlist wishList;
}
