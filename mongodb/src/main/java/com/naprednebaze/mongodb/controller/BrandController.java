package com.naprednebaze.mongodb.controller;

import com.naprednebaze.mongodb.model.Brand;
import com.naprednebaze.mongodb.service.BrandService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/rest/mongodb/brand")
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping(
            value = "/getAll",
            produces = {"application/json"}
    )
    public Collection<Brand> getAllBrands() {
        return brandService.findAllBrands();
    }

    @PostMapping(
            value = "/addBrand",
            produces = {"application/json"}
    )
    public HttpStatus addBrand(@RequestBody(required = true) Brand brand) {
        try {
            brandService.addBrand(brand);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @GetMapping(
            value = "/findBrandByName",
            produces = {"application/json"}
    )
    public Brand findBrandByName(@RequestParam("name") String name) {
        return brandService.findBrandByName(name);
    }
}
