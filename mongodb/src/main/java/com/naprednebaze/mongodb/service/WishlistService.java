package com.naprednebaze.mongodb.service;

import com.naprednebaze.mongodb.model.Product;
import com.naprednebaze.mongodb.model.User;
import com.naprednebaze.mongodb.model.Wishlist;
import com.naprednebaze.mongodb.repository.ProductRepository;
import com.naprednebaze.mongodb.repository.UserRepository;
import com.naprednebaze.mongodb.repository.WishlistRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public Collection<Wishlist> getAllWishlists() {
        return wishlistRepository.findAll();
    }

    public void addWishlist (String username, Product product) {
        Wishlist wishlistOld = wishlistRepository.findWishlistByUsername(username);
        User user = userRepository.findByUsername(username);

        if(wishlistOld == null) {
            Wishlist wishlist = new Wishlist();
            List<Product> productList = new ArrayList<>();
            productList.add(product);

            wishlist.setUsername(username);
            wishlist.setProductList(productList);
            wishlistRepository.insert(wishlist);

            user.setWishList(wishlist);
        }
        else{
            List<Product> productList = wishlistOld.getProductList();
            boolean pom = false;
            for (Product p : productList){
                if (p.getName().equals(product.getName())) {
                    pom = true;
                    break;
                }
            }
            if(!pom) {
                productList.add(product);
                wishlistOld.setProductList(productList);
            }
            wishlistRepository.save(wishlistOld);

            user.setWishList(wishlistOld);
        }
        userRepository.save(user);

    }

    public Wishlist getWishlistByUsername(String username) {
        return wishlistRepository.findWishlistByUsername(username);
    }

    public void deleteWishList(String username, Product product) {
        Wishlist wishlistExisting = wishlistRepository.findWishlistByUsername(username);
        User user = userRepository.findByUsername(username);

        if (wishlistExisting != null) {
            List<Product> productList = wishlistExisting.getProductList();
            List<Product> productListSaving = new ArrayList<>();
            for (Product p : productList) {
                if (!p.getName().equals(product.getName())) {
                    productListSaving.add(p);
                }
            }

            wishlistExisting.setProductList(productListSaving);
            wishlistRepository.save(wishlistExisting);

            user.setWishList(wishlistExisting);
            userRepository.save(user);
        }
    }
}
