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
    public String saveProduct(@Valid @RequestBody Product product) {
        System.out.println("CHECKING PRODUCT: " + product.getName() + " $" + product.getPrice());
        productService.saveProduct(product);
        return "Added product successfully!";
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
        return "Deleted product successfully!";
    }

}
