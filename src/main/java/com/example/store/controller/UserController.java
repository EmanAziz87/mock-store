package com.example.store.controller;

import com.example.store.model.User;
import com.example.store.repository.UserRepository;
import com.example.store.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final SecurityContextRepository securityContextRepository;

    @Autowired
    public UserController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder, SecurityContextRepository securityContextRepository) {
        this.authenticationManager = authenticationManager;
        this.userService = new UserService(userRepository, passwordEncoder);
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User userRequest, HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest) {
        System.out.println("Username request: " + userRequest.getUsername() + "Password request: " + userRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userRequest.getUsername(),
                        userRequest.getPassword()
                )
        );
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, httpServletRequest, httpServletResponse);
        return ResponseEntity.ok("User successfully authenticated: " + authentication.getName());
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout() {
        return ResponseEntity.ok("User successfully logged out!");
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody User userRequest) {
        try {
            System.out.println("Username request: " + userRequest.getUsername() + "Password request: " + userRequest.getPassword());
            userService.registerUser(userRequest.getUsername(), userRequest.getPassword(), userRequest.getRole());
            return ResponseEntity.ok("User successfully registered!");
        } catch (Exception e) {
            System.out.println("Exception: failed to register user");
            return ResponseEntity.badRequest().body("User not registered: " + e.getMessage());
        }

    }

}
