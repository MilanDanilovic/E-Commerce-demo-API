package com.naprednebaze.mongodb.model;

import lombok.Data;

import java.util.List;

@Data
public class ShoppingListing {
    private List<ProductListing> productListings;
    private Double totalPrice;
    private String username;
}
