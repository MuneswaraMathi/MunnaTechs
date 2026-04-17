package com.example.team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TeamService {
    @Autowired
    private TeamRepository repository;

    @NonNull
    @SuppressWarnings("null")
    public Team createTeam(Team team) {
        return repository.save(team);
    }

    public List<Team> getAllTeams() {
        return repository.findAll();
    }

    public Team getTeamById(@NonNull Long id) {
        return repository.findById(id).orElse(null);
    }

    public Team updateTeam(@NonNull Long id, Team team) {
        Team existing = repository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setName(team.getName());
        existing.setFatherName(team.getFatherName());
        existing.setMobileNumber(team.getMobileNumber());
        existing.setEmail(team.getEmail());
        existing.setActivityName(team.getActivityName());
        return repository.save(existing);
    }

    public void deleteTeam(@NonNull Long id) {
        repository.deleteById(id);
    }
}
