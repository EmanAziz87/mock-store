package com.example.store.controller;

import com.example.store.model.Product;
import com.example.store.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private HttpServletRequest request;

    @GetMapping("/test")
    public ResponseEntity<String> testAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Security context holder in test route: " + authentication);
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authenticated");
        }
        return ResponseEntity.ok("Authenticated as: " + authentication.getName());
    }

    @GetMapping("/")
    public List<Product> viewHomePage(@AuthenticationPrincipal Authentication authentication) {
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
