package com.example.store.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

    @Id
    @NotNull(message = "Username cannot be null!")
    @Size(min = 4, max = 30, message = "Username must be between 4 and 30 characters!")
    private String username;

    @NotNull(message = "Password cannot be null!")
    @Size(min = 8, max = 30, message = "Password must be between 8 and 30 characters!")
    private String password;

//    @NotNull(message = "Role cannot be null!")
    private String role;

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User() {}

    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public String getRole() {
        return role;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
