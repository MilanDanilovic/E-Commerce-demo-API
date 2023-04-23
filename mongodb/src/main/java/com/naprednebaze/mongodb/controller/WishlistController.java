package com.naprednebaze.mongodb.controller;

import com.naprednebaze.mongodb.model.Product;
import com.naprednebaze.mongodb.model.ShoppingListing;
import com.naprednebaze.mongodb.model.Wishlist;
import com.naprednebaze.mongodb.service.WishlistService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/rest/mongodb/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping(
            value = "/getAll"
    )
    public Collection<Wishlist> getAllWishlists() {
        return wishlistService.getAllWishlists();
    }

    @GetMapping(
            value = "/getWishlistByUsername"
    )
    public Wishlist getWishlistByUsername(@RequestParam("username") String username) {
        return wishlistService.getWishlistByUsername(username);
    }

    @PostMapping(
            value = "/addWishlist",
            produces = {"application/json"}
    )
    public HttpStatus addWishlist(@RequestParam("username") String username, @RequestBody(required = true) Product product) {
        try {
            wishlistService.addWishlist(username, product);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @DeleteMapping(
            value = "/deleteWishList",
            produces = {"application/json"}
    )
    public HttpStatus deleteWishList(@RequestParam("username") String username, @RequestBody(required = true) Product product) {
        try {
            wishlistService.deleteWishList(username, product);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }
}
