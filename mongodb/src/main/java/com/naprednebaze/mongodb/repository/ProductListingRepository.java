package com.naprednebaze.mongodb.repository;

import com.naprednebaze.mongodb.model.ProductListing;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductListingRepository extends MongoRepository<ProductListing, String> {

}
