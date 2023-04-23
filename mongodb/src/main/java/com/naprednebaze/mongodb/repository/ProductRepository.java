package com.naprednebaze.mongodb.repository;

import com.naprednebaze.mongodb.model.Brand;
import com.naprednebaze.mongodb.model.Enumerations.ProductType;
import com.naprednebaze.mongodb.model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import java.util.Collection;

public interface ProductRepository extends MongoRepository<Product, String> {

    Product findProductById(@Param("id") ObjectId id);

    Collection<Product> findProductByProductType(@Param("productType") ProductType productType);

    Collection<Product> findProductByBrand(@Param("brand")Brand brand);

    Product findProductByNameAndProductType(@Param("name") String name, @Param("productType") ProductType productType);

    Product findByName(@Param("name")String name);
}
