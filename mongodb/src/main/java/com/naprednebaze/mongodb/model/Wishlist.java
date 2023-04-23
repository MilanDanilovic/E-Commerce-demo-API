package com.naprednebaze.mongodb.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "wishlist")
public class Wishlist {

    @Id
    private ObjectId id;

    @JsonProperty("productList")
    private List<Product> productList;

    @Indexed(unique = true)
    @JsonProperty("username")
    private String username;

}
