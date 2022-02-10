package com.naprednebaze.mongodb.model.Enumerations;

public enum Role {

    ADMIN("ADMIN"),
    USER("USER");

    private final String role;

    private Role(String role) {
        this.role = role;
    }

    public String getCode() {
        return role;
    }
}
