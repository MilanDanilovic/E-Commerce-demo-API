package com.naprednebaze.mongodb.model.Enumerations;

public enum FlagNew {

    NEW("NEW"),
    OLD("OLD");

    private final String flag;

    private FlagNew(String flag) {
        this.flag = flag;
    }

    public String getCode() {
        return flag;
    }
}
