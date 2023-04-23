package com.naprednebaze.mongodb.model.Enumerations;

public enum ProductType {

    EYES("EYES"),
    FACE("FACE"),
    CHEEKS("CHEEKS"),
    BROWS("BROWS"),
    LIPS("LIPS"),
    SETS("SETS"),
    NAILS("NAILS");

    private final String type;

    private ProductType(String type) {
        this.type = type;
    }

    public String getCode() {
        return type;
    }
}
