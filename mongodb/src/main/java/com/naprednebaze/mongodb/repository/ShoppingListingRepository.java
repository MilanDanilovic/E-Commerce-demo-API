package com.naprednebaze.mongodb.repository;

import com.naprednebaze.mongodb.model.ShoppingListing;
import org.springframework.data.mongodb.core.query.Collation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface ShoppingListingRepository extends MongoRepository<ShoppingListing, String> {
    ShoppingListing findByUsernameAndBought(@Param("username") String username,@Param("bought") boolean bought);

    Collection<ShoppingListing> findShoppingListingByBoughtAndUsername(@Param("bought") boolean bought, @Param("username") String username);

    List<ShoppingListing> findByUsername(@Param("username")String username);

}
