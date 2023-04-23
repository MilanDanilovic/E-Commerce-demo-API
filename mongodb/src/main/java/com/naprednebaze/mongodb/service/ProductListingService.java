package com.naprednebaze.mongodb.service;

import com.naprednebaze.mongodb.model.ProductListing;
import com.naprednebaze.mongodb.model.ShoppingListing;
import com.naprednebaze.mongodb.model.User;
import com.naprednebaze.mongodb.repository.ProductListingRepository;
import com.naprednebaze.mongodb.repository.ShoppingListingRepository;
import com.naprednebaze.mongodb.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ProductListingService {

    private final ProductListingRepository productListingRepository;
    private final ShoppingListingRepository shoppingListingRepository;
    private final UserRepository userRepository;

    public ProductListingService(ProductListingRepository productListingRepository, ShoppingListingRepository shoppingListingRepository,
                                UserRepository userRepository) {
        this.productListingRepository = productListingRepository;
        this.shoppingListingRepository = shoppingListingRepository;
        this.userRepository = userRepository;
    }

    public Collection<ProductListing> getAllProductListings() {
        return productListingRepository.findAll();
    }

    public void addProductListing(ProductListing productListing,String username) {
        ShoppingListing shoppingListing = shoppingListingRepository.findByUsernameAndBought(username, false);
        User user = userRepository.findByUsername(username);
        List<ProductListing> pLL = new ArrayList<>();
        boolean nadjenProductListing = false;
        if(shoppingListing != null){ //nasao ga je SL
            for(ProductListing p : shoppingListing.getProductListings()){
                if(p.getProduct().getName().equals(productListing.getProduct().getName()) && p.getProduct().getBrand().getName().equals(productListing.getProduct().getBrand().getName())){
                    p.setCount(productListing.getCount());
                    nadjenProductListing = true; //nasao je produkt
                }
            }

            pLL = shoppingListing.getProductListings();
            if(!nadjenProductListing) { //nije nasao produkt
                pLL.add(productListing);
                shoppingListing.setProductListings(pLL);
            }
            else{ //provera za nadjeni produkt da nije 0 count
                ProductListing pomRemoval = new ProductListing();
                for(ProductListing p : pLL){
                    if(p.getCount() <= 0){
                        pomRemoval = p;
                    }
                }
                shoppingListing.getProductListings().remove(pomRemoval);
            }
            double price = 0d;
            for(ProductListing p : shoppingListing.getProductListings()){
                price += p.getProduct().getPrice() * p.getCount();
            }
            shoppingListing.setTotalPrice(price);
            shoppingListingRepository.save(shoppingListing);

            List<ShoppingListing> listings = shoppingListingRepository.findByUsername(username);
            for (ShoppingListing s : listings){
                if(s.isBought() == shoppingListing.isBought())
                    s = shoppingListing;
            }
            user.setShoppingListings(listings);
            userRepository.save(user);
        }
        else{//nije nasao SL kreira novi
            ShoppingListing shoppingListingNew = new ShoppingListing();
            pLL.add(productListing);
            shoppingListingNew.setProductListings(pLL);
            shoppingListingNew.setUsername(username);
            shoppingListingNew.setBought(false);
            double price = 0d;
            for(ProductListing p : shoppingListingNew.getProductListings()){
                price += p.getProduct().getPrice() * p.getCount();
            }
            shoppingListingNew.setTotalPrice(price);
            shoppingListingRepository.save(shoppingListingNew);

            List<ShoppingListing> listings = shoppingListingRepository.findByUsername(username);
            for (ShoppingListing s : listings){
                if(s.isBought() == shoppingListingNew.isBought())
                    s = shoppingListingNew;
            }
            user.setShoppingListings(listings);
            userRepository.save(user);
        }

    }
}
