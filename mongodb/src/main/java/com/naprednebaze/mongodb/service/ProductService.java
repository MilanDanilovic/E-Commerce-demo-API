package com.naprednebaze.mongodb.service;

import com.naprednebaze.mongodb.model.Brand;
import com.naprednebaze.mongodb.model.Enumerations.ProductType;
import com.naprednebaze.mongodb.model.Product;
import com.naprednebaze.mongodb.repository.BrandRepository;
import com.naprednebaze.mongodb.repository.ProductRepository;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;

    public ProductService(ProductRepository productRepository, BrandRepository brandRepository) {
        this.productRepository = productRepository;
        this.brandRepository = brandRepository;
    }

    public Collection<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void addProduct(Product product) {
        productRepository.insert(product);
    }

    public Product findProductById(String id) {
        return productRepository.findProductById(new ObjectId(id));
    }

    public Product findProductByName(String name) {
        return productRepository.findByName(name);
    }

    public Collection<Product> findProductByProductType(String productType) {
        return productRepository.findProductByProductType(ProductType.valueOf(productType));
    }

    public Collection<Product> findProductByProductTypeThree(String productType) {
        return productRepository.findProductByProductType(ProductType.valueOf(productType))
                .stream()
                .limit(3)
                .collect(Collectors.toList());
    }

    public Collection<Product> findProductByPriceLowToHigh () {
        return productRepository.findAll(Sort.by(Sort.Direction.ASC, "price"));
    }

    public Collection<Product> findProductByPriceHighToLow () {
        return productRepository.findAll(Sort.by(Sort.Direction.DESC, "price"));
    }

    public Collection<Product> findProductByBrand(String name) {
        Collection<Product> productCollection = productRepository.findAll();
        List<Product> productList = new ArrayList<>();

        for (Product p : productCollection) {
            if (p.getBrand().getName().equals(name)) {
                productList.add(p);
            }
        }

        return productList;
    }

    public void deleteAll() {
        productRepository.deleteAll();
    }

    public void deleteProduct(String name, String productType) {
        Product product = productRepository.findProductByNameAndProductType(name, ProductType.valueOf(productType));
        productRepository.delete(product);
    }

    public void updateProduct(Product product){

        Product productOld = productRepository.findProductById(product.getId());

        productOld.setBrand(product.getBrand());
        productOld.setProductType(product.getProductType());
        productOld.setDescription(product.getDescription());
        productOld.setDiscount(product.getDiscount());
        productOld.setFlagNew(product.getFlagNew());
        productOld.setName(product.getName());
        productOld.setPrice(product.getPrice());
        productOld.setImageURL1(product.getImageURL1());
        productOld.setImageURL2(product.getImageURL2());
        productOld.setImageURL3(product.getImageURL3());

        productRepository.save(productOld);

    }
}
