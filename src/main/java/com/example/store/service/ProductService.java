package com.example.store.service;

import com.example.store.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    void saveProduct(Product product);
    void deleteProduct(long id);
}
