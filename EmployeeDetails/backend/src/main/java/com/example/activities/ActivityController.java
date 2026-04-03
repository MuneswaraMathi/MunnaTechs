package com.example.activities;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/activities")
public class ActivityController {

    private static final Logger logger = LoggerFactory.getLogger(ActivityController.class);

    @Autowired
    private ActivityService service;

    @PostMapping("/addActivity")
    public ResponseEntity<?> addActivity(@RequestBody Activity activity) {
        logger.info("Received add activity request - Name: {}", activity.getActivityName());
        try {
            Activity saved = service.createActivity(activity);
            logger.info("Activity saved successfully with ID: {}", saved.getId());
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            logger.error("Error saving activity: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to save activity"));
        }
    }

    @GetMapping("/showActivities")
    public ResponseEntity<List<Activity>> getAllActivities() {
        logger.debug("Fetching all activities");
        List<Activity> activities = service.getAllActivities();
        logger.info("Retrieved {} activities", activities.size());
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/showActivity/{id}")
    public ResponseEntity<?> getActivityById(@PathVariable Long id) {
        logger.debug("Fetching activity with ID: {}", id);
        Activity activity = service.getActivityById(id);
        if (activity == null) {
            logger.warn("Activity not found with ID: {}", id);
            return ResponseEntity.status(404).body(Map.of("error", "Activity not found"));
        }
        return ResponseEntity.ok(activity);
    }

    @PutMapping("/updateActivity/{id}")
    public ResponseEntity<?> updateActivity(@PathVariable Long id, @RequestBody Activity activity) {
        logger.info("Updating activity with ID: {}", id);
        Activity existing = service.getActivityById(id);
        if (existing == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Activity not found"));
        }
        existing.setActivityName(activity.getActivityName());
        existing.setDescription(activity.getDescription());
        existing.setEstimationCost(activity.getEstimationCost());
        existing.setStartDate(activity.getStartDate());
        existing.setEndDate(activity.getEndDate());
        Activity updated = service.createActivity(existing);
        logger.info("Activity updated successfully with ID: {}", updated.getId());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/deleteActivity/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long id) {
        logger.info("Deleting activity with ID: {}", id);
        service.deleteActivity(id);
        return ResponseEntity.ok(Map.of("message", "Activity deleted successfully"));
    }
}
