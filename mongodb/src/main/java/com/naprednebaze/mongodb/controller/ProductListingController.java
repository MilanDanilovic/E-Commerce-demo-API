package com.naprednebaze.mongodb.controller;

import com.naprednebaze.mongodb.model.ProductListing;
import com.naprednebaze.mongodb.service.ProductListingService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/rest/mongodb/productListings")
public class ProductListingController {

    private final ProductListingService productListingService;

    public ProductListingController(ProductListingService productListingService) {
        this.productListingService = productListingService;
    }

    @GetMapping(
            value = "/getAll"
    )
    public Collection<ProductListing> getAllProductListings() {
        return productListingService.getAllProductListings();
    }

    @PostMapping(
            value = "/addProductListing",
            produces = {"application/json"}
    )
    public HttpStatus addProductListing(@RequestParam("username")String username, @RequestBody(required = true) ProductListing productListing) {
        try {
            productListingService.addProductListing(productListing,username);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }
}
