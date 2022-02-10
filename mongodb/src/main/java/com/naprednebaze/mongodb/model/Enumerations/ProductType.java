package com.naprednebaze.mongodb.model.Enumerations;

public enum ProductType {

    MAKEUP("MAKEUP"),
    SKINCARE("SKINCARE"),
    HAIR("HAIR"),
    FRAGRANCE("FRAGRANCE"),
    BATH("BATH"),
    TOOLS("TOOLS");

    private final String type;

    private ProductType(String type) {
        this.type = type;
    }

    public String getCode() {
        return type;
    }
}
