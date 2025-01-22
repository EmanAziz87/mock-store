package com.example.store.controller;

import com.example.store.model.Product;
import com.example.store.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:63344")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public List<Product> viewHomePage() {
        return productService.getAllProducts();
    }

    @PostMapping("/saveProduct")
    public String saveProduct(@Valid @ModelAttribute Product product) {
        productService.saveProduct(product);
        return "Added product successfully!";
    }

}
