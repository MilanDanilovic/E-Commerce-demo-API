package com.naprednebaze.mongodb.service;

import com.naprednebaze.mongodb.model.ShoppingListing;
import com.naprednebaze.mongodb.repository.ShoppingListingRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import java.util.Collection;

@Service
public class ShoppingListingService {

    private final ShoppingListingRepository shoppingListingRepository;

    public ShoppingListingService(ShoppingListingRepository shoppingListingRepository) {
        this.shoppingListingRepository = shoppingListingRepository;
    }

    public Collection<ShoppingListing> getAllShoppingListings() {
        return shoppingListingRepository.findAll();
    }

    public void addShoppingListing (ShoppingListing shoppingListing) {  //kupljen
        shoppingListing.setBought(true);
        shoppingListingRepository.insert(shoppingListing);
    }



    public void removeShoppingListing(ShoppingListing shoppingListing){ //odustao od kupovine
        if(!shoppingListing.isBought()) {
            shoppingListingRepository.delete(shoppingListing);
        }
        else {
            throw new IllegalArgumentException("Shopping listing is bought");
        }
    }

    public Collection<ShoppingListing> findBoughtShoppingListings(String username) {
        return shoppingListingRepository.findShoppingListingByBoughtAndUsername(true, username);
    }

    public Collection<ShoppingListing> findNotBoughtShoppingListings(String username) {
        return shoppingListingRepository.findShoppingListingByBoughtAndUsername(false, username);
    }

    public Collection<ShoppingListing> findShoppingListingsThatAreBought(String username) {
        return shoppingListingRepository.findShoppingListingByBoughtAndUsername(true, username);
    }

    public void updateBought(String username) {
        ShoppingListing shoppingListing = shoppingListingRepository.findByUsernameAndBought(username, false);
        shoppingListing.setBought(true);
        shoppingListingRepository.save(shoppingListing);
    }
}
