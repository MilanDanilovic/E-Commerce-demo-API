package com.naprednebaze.mongodb.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "shoppingListing")
public class ShoppingListing {

    @Id
    @JsonProperty("id")
    private ObjectId id;

    @JsonProperty("productListings")
    private List<ProductListing> productListings;

    @JsonProperty("totalPrice")
    private Double totalPrice;

    @JsonProperty("username")
    private String username;

    @JsonProperty("bought")
    private boolean bought;

    public ShoppingListing(ObjectId id, List<ProductListing> productListings, Double totalPrice, String username, boolean bought) {
        this.id = id;
        this.productListings = productListings;
        this.totalPrice = totalPrice;
        this.username = username;
        this.bought = bought;
    }

}
