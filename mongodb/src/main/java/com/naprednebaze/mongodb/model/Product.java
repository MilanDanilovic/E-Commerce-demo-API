package com.naprednebaze.mongodb.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.naprednebaze.mongodb.model.Enumerations.Discount;
import com.naprednebaze.mongodb.model.Enumerations.FlagNew;
import com.naprednebaze.mongodb.model.Enumerations.ProductType;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "product")
public class Product {
    @Id
    @JsonProperty("id")
    private ObjectId id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("imageURL1")
    private String imageURL1;

    @JsonProperty("imageURL2")
    private String imageURL2;

    @JsonProperty("imageURL3")
    private String imageURL3;

    @JsonProperty("brand")
    private Brand brand;

    @JsonProperty("description")
    private String description;

    @JsonProperty("flagNew")
    private FlagNew flagNew;

    @JsonProperty("price")
    private Double price;

    @JsonProperty("discount")
    private Discount discount;

    @JsonProperty("productType")
    private ProductType productType;

    public Product (String name, ProductType productType) {
        this.name = name;
        this.productType = productType;
    }
}
