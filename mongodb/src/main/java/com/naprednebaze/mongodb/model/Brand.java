package com.naprednebaze.mongodb.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "brand")
public class Brand {

    @Id
    @JsonProperty("id")
    private ObjectId id;

    @Indexed(unique = true)
    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("logo")
    private String logo;
}
