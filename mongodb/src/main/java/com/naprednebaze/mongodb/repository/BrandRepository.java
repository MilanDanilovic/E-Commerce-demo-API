package com.naprednebaze.mongodb.repository;

import com.naprednebaze.mongodb.model.Brand;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

public interface BrandRepository extends MongoRepository<Brand, String> {

    Brand findBrandByName(@Param("name") String name);
}
