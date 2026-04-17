package com.example.team;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/team")
public class TeamController {
    private static final Logger logger = LoggerFactory.getLogger(TeamController.class);

    @Autowired
    private TeamService service;

    @PostMapping("/saveTeam")
    public ResponseEntity<?> addTeam(@RequestBody Team team) {
        logger.info("Received team request - Name: {}, ActivityName: {}",
            team.getName(), team.getActivityName());
        try {
            Team saved = service.createTeam(team);
            logger.info("Team member saved successfully with ID: {}", saved.getId());
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            logger.error("Error saving team member: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to save team member"));
        }
    }

    @GetMapping("/showTeam")
    public ResponseEntity<List<Team>> getAllTeams() {
        logger.debug("Fetching all team members");
        List<Team> teams = service.getAllTeams();
        logger.info("Retrieved {} team members", teams.size());
        return ResponseEntity.ok(teams);
    }

    @PutMapping("/updateTeam/{id}")
    public ResponseEntity<?> updateTeam(@PathVariable Long id, @RequestBody Team team) {
        logger.info("Updating team member with ID: {}", id);
        Team updated = service.updateTeam(id, team);
        if (updated == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Team member not found"));
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/deleteTeam/{id}")
    public ResponseEntity<?> deleteTeam(@PathVariable Long id) {
        logger.info("Deleting team member with ID: {}", id);
        if (id == null) {
            logger.warn("Team ID is null");
            return ResponseEntity.status(400).body(Map.of("error", "Team ID cannot be null"));
        }
        service.deleteTeam(id);
        logger.info("Team member deleted successfully with ID: {}", id);
        return ResponseEntity.ok(Map.of("message", "Team member deleted successfully"));
    }
}
