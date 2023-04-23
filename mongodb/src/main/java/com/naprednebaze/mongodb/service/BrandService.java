package com.naprednebaze.mongodb.service;

import com.naprednebaze.mongodb.model.Brand;
import com.naprednebaze.mongodb.repository.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public Collection<Brand> findAllBrands(){
        return brandRepository.findAll();
    }

    public void addBrand(Brand brand) {
        brandRepository.insert(brand);
    }

    public Brand findBrandByName(String name) {
        return brandRepository.findBrandByName(name);
    }

}
