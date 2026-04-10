package com.example.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User register(User user) {
        // Check if email already exists
        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public User login(String email, String password) {
        Optional<User> userOpt = repo.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("userName: " + user.getFirstName()+" "+user.getLastName() + " email: " + user.getEmail());
            if (encoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }

    public void updatePassword(UpdatePasswordRequest request) {
        if (request == null || isBlank(request.getEmail()) || isBlank(request.getCurrentPassword())
                || isBlank(request.getNewPassword()) || isBlank(request.getConfirmPassword())) {
            throw new RuntimeException("All fields are required");
        }

        if (request.getNewPassword().length() < 8) {
            throw new RuntimeException("New password must be at least 8 characters");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("New password and confirm password do not match");
        }

        Optional<User> userOpt = repo.findByEmail(request.getEmail().trim());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Email not registered");
        }

        User user = userOpt.get();
        if (!encoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        if (encoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new RuntimeException("New password must be different from current password");
        }

        user.setPassword(encoder.encode(request.getNewPassword()));
        repo.save(user);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    public List<User> usersList() {
        List<User> users = repo.findAll();
        if (!CollectionUtils.isEmpty(users)) {
                return users;
         }else{
          return null;
         }
    }
}
