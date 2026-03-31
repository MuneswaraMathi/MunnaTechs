package com.example.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.personal.PersonalInfo;
import com.example.personal.PersonalInfoService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService service;

     @Autowired
    private PersonalInfoService infoService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        logger.info("Registration request for email: {}", user.getEmail());
        try {
            System.out.println("userName: "+user.getFirstName());
            User saved = service.register(user);
            logger.info("User registered successfully with ID: {}", saved.getId());

            PersonalInfo personalInfo = new PersonalInfo();
            personalInfo.setFirstName(user.getFirstName());
            personalInfo.setLastName(user.getLastName());
            personalInfo.setEmail(user.getEmail());
            personalInfo.setPhoneNumber(user.getPhoneNumber());
            infoService.savePersonalInfo(personalInfo);

            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            logger.warn("Registration failed for email {}: {}", user.getEmail(), e.getMessage());
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        logger.info("Login attempt for email: {}", req.get("email"));
        User user = service.login(req.get("email"), req.get("password"));
        if (user == null) {
            logger.warn("Login failed for email: {}", req.get("email"));
            return ResponseEntity.status(401).body(Map.of("error","Invalid credentials"));
        }

        String firstName = user.getFirstName();
        String lastName =  user.getLastName();
        String email = user.getEmail();
        System.out.println("Username: " + firstName + " Email: " + email);
        String token = jwtUtil.generateToken(user.getEmail());
        logger.info("Login successful for email: {}", user.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("firstName", firstName);
        response.put("lastName", lastName);
        response.put("email", email);
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/home")
    public ResponseEntity<?> home() {
        logger.info("Home page redirection successful..");
        return ResponseEntity.ok("home page redirection successfully");
    }

     @PostMapping("/profile")
    public ResponseEntity<?> profile() {
        logger.info("Home page redirection successful..");
        return ResponseEntity.ok("home page redirection successfully");
    }

    @GetMapping
    public ResponseEntity<?> info() {
        return ResponseEntity.ok(Map.of("message", "Auth API - Use POST /auth/register or POST /auth/login"));
    }
}
