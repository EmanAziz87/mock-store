package com.example.store.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "products")
public class Product {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Product name cannot be null!")
    @Size(min = 2, max = 50, message = "Product name must be between 2 and 50 characters!")
    private String name;

    @NotNull(message = "Product price cannot be null!")
    @Min(value = 1, message = "Product price must be a positive value")
    private double price;

    public Product(String name, double price, int id) {
        this.name = name;
        this.price = price;
        this.id = id;
    }

    public Product() {}

    public String getName() {
        return name;
    }
    public double getPrice() {
        return price;
    }
    public long getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", id=" + id +
                '}';
    }

}
