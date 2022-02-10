package com.naprednebaze.mongodb.model;

import com.naprednebaze.mongodb.model.Enumerations.Discount;
import com.naprednebaze.mongodb.model.Enumerations.FlagNew;
import com.naprednebaze.mongodb.model.Enumerations.ProductType;

public class Product {
    private String name;
    private String imageURL1;
    private String imageURL2;
    private String imageURL3;
    private Brand brand;
    private String description;
    private FlagNew flagNew;
    private Double price;
    private Discount discount;
    private ProductType productType;
}
