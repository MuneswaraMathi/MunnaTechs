package com.example.contributions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/contributions")
public class ContributionController {
    private static final Logger logger = LoggerFactory.getLogger(ContributionController.class);
    
    @Autowired
    private ContributionService service;

    
    @PostMapping("/saveContribution")
    public ResponseEntity<?> createContribution(@RequestBody Contribution contribution) {
        logger.info("Received contribution request - Name: {}, Email: {}, Amount: {}", 
            contribution.getName(), contribution.getEmail(), contribution.getAmount());
            Date date = new Date();
            contribution.setDate(date);
        try {
        Contribution saved = service.createContribution(contribution);
            logger.info("Contribution saved successfully with ID: {}", saved.getId());
        return ResponseEntity.ok(saved);
        } catch (Exception e) {
            logger.error("Error saving contribution: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to save contribution"));
        }
    }

    @PostMapping("/addContribution")
    public ResponseEntity<?> addContribution(@RequestBody Contribution contribution) {
        logger.info("Received contribution request - Name: {}, Email: {}, Amount: {}", 
            contribution.getName(), contribution.getEmail(), contribution.getAmount());

        try {
        Contribution saved = service.createContribution(contribution);
            logger.info("Contribution saved successfully with ID: {}", saved.getId());
        return ResponseEntity.ok(saved);
        } catch (Exception e) {
            logger.error("Error saving contribution: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to save contribution"));
        }
    }

    @GetMapping("/showContributions")
    public ResponseEntity<List<Contribution>> getAllContributions(@RequestParam(required = false) String email) {
        logger.debug("Fetching all contributions");
        List<Contribution> contributions = service.getAllContributions();
        logger.info("Retrieved {} contributions", contributions.size());
        return ResponseEntity.ok(contributions);
    }

    @GetMapping("/showContribution/{id}")
    public ResponseEntity<?> getContributionById(@PathVariable Long id) {
        logger.debug("Fetching contribution with ID: {}", id);
        if (id == null) {
            logger.warn("Contribution ID is null");
            return ResponseEntity.status(400).body(Map.of("error", "Contribution ID cannot be null"));
        }
        Contribution contribution = service.getContributionById(id);
        if (contribution == null) {
            logger.warn("Contribution not found with ID: {}", id);
            return ResponseEntity.status(404).body(Map.of("error", "Contribution not found"));
        }
        logger.info("Retrieved contribution: {}", contribution);
        return ResponseEntity.ok(contribution);
    }

    @GetMapping("/showContributions/{email}")
    public ResponseEntity<List<Contribution>> getContributionsByEmail(@PathVariable String email) {
        logger.debug("Fetching contributions for email: {}", email);
        List<Contribution> contributions = service.getContributionsByEmail(email);
        logger.info("Retrieved {} contributions for email: {}", contributions.size(), email);
        return ResponseEntity.ok(contributions);
    }

    @PutMapping("/updateContribution/{id}")
    public ResponseEntity<?> updateContribution(@PathVariable Long id, @RequestBody Contribution contribution) {
        logger.info("Updating contribution with ID: {}", id);
        Contribution updated = service.updateContribution(id, contribution);
        if (updated == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Contribution not found"));
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/deleteContribution/{id}")
    public ResponseEntity<?> deleteContribution(@PathVariable Long id) {
        logger.info("Deleting contribution with ID: {}", id);
        if (id == null) {
            logger.warn("Contribution ID is null");
            return ResponseEntity.status(400).body(Map.of("error", "Contribution ID cannot be null"));
        }
        service.deleteContribution(id);
        logger.info("Contribution deleted successfully with ID: {}", id);
        return ResponseEntity.ok(Map.of("message", "Contribution deleted successfully"));
    }

    @GetMapping("/totalFundsByActivity")
    public ResponseEntity<List<Map<String, Object>>> getTotalFundsByActivity() {
        logger.info("Fetching total funds by activity");
        return ResponseEntity.ok(service.getTotalFundsByActivity());
    }
}