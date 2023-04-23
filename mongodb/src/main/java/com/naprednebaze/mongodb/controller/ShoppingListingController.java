package com.naprednebaze.mongodb.controller;

import com.naprednebaze.mongodb.model.ShoppingListing;
import com.naprednebaze.mongodb.service.ShoppingListingService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/rest/mongodb/shoppingListings")
public class ShoppingListingController {

    private final ShoppingListingService shoppingListingService;

    public ShoppingListingController(ShoppingListingService shoppingListingService) {
        this.shoppingListingService = shoppingListingService;
    }

    @GetMapping(
            value = "/getAll"
    )
    public Collection<ShoppingListing> getAllShoppingListings() {
        return shoppingListingService.getAllShoppingListings();
    }

    @GetMapping(
            value = "/findBoughtShoppingListings"
    )
    public Collection<ShoppingListing> findBoughtShoppingListings(@RequestParam("username") String username) {
        return shoppingListingService.findBoughtShoppingListings(username);
    }

    @GetMapping(
            value = "/findNotBoughtShoppingListings"
    )
    public Collection<ShoppingListing> findNotBoughtShoppingListings(@RequestParam("username") String username) {
        return shoppingListingService.findNotBoughtShoppingListings(username);
    }

    @PostMapping(
            value = "/addShoppingListing",
            produces = {"application/json"}
    )
    public HttpStatus addShoppingListing(@RequestBody(required = true) ShoppingListing shoppingListing) {
        try {
            shoppingListingService.addShoppingListing(shoppingListing);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }


    @DeleteMapping(
            value = "/deleteShoppingListing",
            produces = {"application/json"}
    )
    public HttpStatus deleteShoppingListing(@RequestBody(required = true) ShoppingListing shoppingListing) {
        try {
            shoppingListingService.removeShoppingListing(shoppingListing);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @PutMapping(
            value = "/updateBought",
            produces = {"application/json"}
    )
    public HttpStatus updateBought(@RequestParam("username") String username) {
        try {
            shoppingListingService.updateBought(username);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }
}
