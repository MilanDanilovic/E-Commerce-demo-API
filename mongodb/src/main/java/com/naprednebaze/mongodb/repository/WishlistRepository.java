package com.naprednebaze.mongodb.repository;

import com.naprednebaze.mongodb.model.Wishlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

public interface WishlistRepository extends MongoRepository<Wishlist, String> {

    Wishlist findWishlistByUsername(@Param("username") String username);

}
