package com.naprednebaze.mongodb.model.Enumerations;

public enum Discount {

    NONE (0),
    SMALL(30),
    HALF(50),
    BIG(80);

    private final int discount;

    Discount(int discount) {
        this.discount = discount;
    }

    public int getZoomLevel() {
        return discount;
    }
}
