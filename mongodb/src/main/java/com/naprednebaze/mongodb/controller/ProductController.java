package com.naprednebaze.mongodb.controller;

import com.naprednebaze.mongodb.model.Brand;
import com.naprednebaze.mongodb.model.Product;
import com.naprednebaze.mongodb.service.ProductService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/rest/mongodb/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(
            value = "/getAll"
    )
    public Collection<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping(
            value = "/findProductById"
    )
    public Product findProductById(@RequestParam("id") String id) {
        return productService.findProductById(id);
    }

    @GetMapping(
            value = "/findProductByName"
    )
    public Product findProductByName(@RequestParam("name") String name) {
        return productService.findProductByName(name);
    }

    @GetMapping(
            value = "/findProductByProductType"
    )
    public Collection<Product> findProductByProductType(@RequestParam("productType") String productType) {
        return productService.findProductByProductType(productType);
    }

    @GetMapping(
            value = "/findProductByProductTypeThree"
    )
    public Collection<Product> findProductByProductTypeThree(@RequestParam("productType") String productType) {
        return productService.findProductByProductTypeThree(productType);
    }

    @GetMapping(
            value = "/findProductByPriceLowToHigh"
    )
    public Collection<Product> findProductByPriceLowToHigh() {
        return productService.findProductByPriceLowToHigh();
    }

    @GetMapping(
            value = "/findProductByPriceHighToLow"
    )
    public Collection<Product> findProductByPriceHighToLow() {
        return productService.findProductByPriceHighToLow();
    }

    @GetMapping(
            value = "/findProductByBrand"
    )
    public Collection<Product> findProductByBrand(@RequestParam("name") String name) {
        return productService.findProductByBrand(name);
    }

    @PostMapping(
            value = "/addProduct",
            produces = {"application/json"}
    )
    public HttpStatus addProduct(@RequestBody(required = true) Product product) {
        try {
            productService.addProduct(product);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @DeleteMapping(
            value = "/deleteAll",
            produces = {"application/json"}
    )
    public HttpStatus deleteAll() {
        try {
            productService.deleteAll();
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @DeleteMapping(
            value = "/deleteProduct",
            produces = {"application/json"}
    )
    public HttpStatus deleteProduct(@RequestParam("name") String name, @RequestParam("productType") String productType) {
        try {
            productService.deleteProduct(name, productType);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @PutMapping(
            value = "/updateProduct",
            produces = {"application/json"}
    )
    public HttpStatus updateProduct(@RequestBody(required = true) Product product) {
        try {
            productService.updateProduct(product);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }
}
