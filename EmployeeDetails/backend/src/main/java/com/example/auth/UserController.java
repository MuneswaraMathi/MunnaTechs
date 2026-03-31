package com.example.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserService service;

    @GetMapping("/users")
    public ResponseEntity<?> usersList() {
        List<User> users = service.usersList();
        if (users == null) {
            return ResponseEntity.status(401).body(Map.of("error","No users found"));
        }
        return ResponseEntity.ok(Map.of("users", users));
    }
}
