package com.taxfiling.backend.controller;

import com.taxfiling.backend.model.User;
import com.taxfiling.backend.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegistrationRequest request) {
        Map<String, String> response = new HashMap<>();

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            response.put("message", "Passwords do not match");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            response.put("message", "Email is already registered");
            return ResponseEntity.badRequest().body(response);
        }

        User user = new User(
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            request.getMobileNumber()
        );
        userRepository.save(user);

        response.put("message", "Registration successful");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request, HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(401).body(response);
        }

        User user = userOpt.get();
        session.setAttribute("userId", user.getId());
        session.setAttribute("userEmail", user.getEmail());

        response.put("message", "Login successful");
        response.put("email", user.getEmail());
        response.put("mobileNumber", user.getMobileNumber());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> profile(HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        Object userId = session.getAttribute("userId");
        if (userId == null) {
            response.put("message", "Unauthorized. Please log in.");
            return ResponseEntity.status(401).body(response);
        }

        Optional<User> userOpt = userRepository.findById((Long) userId);
        if (userOpt.isEmpty()) {
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }

        User user = userOpt.get();
        response.put("email", user.getEmail());
        response.put("mobileNumber", user.getMobileNumber());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        session.invalidate();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }

    // --- Inner request classes ---

    public static class RegistrationRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d).+$",
            message = "Password must contain at least one uppercase letter and one digit"
        )
        private String password;

        @NotBlank(message = "Confirm password is required")
        private String confirmPassword;

        @NotBlank(message = "Mobile number is required")
        @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid mobile number")
        private String mobileNumber;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getConfirmPassword() { return confirmPassword; }
        public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }

        public String getMobileNumber() { return mobileNumber; }
        public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    }

    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
