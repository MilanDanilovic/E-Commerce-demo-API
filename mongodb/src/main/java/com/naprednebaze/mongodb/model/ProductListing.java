package com.naprednebaze.mongodb.model;

import lombok.Data;

@Data
public class ProductListing {
    private Product product;
    private Integer count;
}
