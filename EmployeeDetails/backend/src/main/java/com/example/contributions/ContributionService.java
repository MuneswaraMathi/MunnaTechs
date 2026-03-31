package com.example.contributions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContributionService {
    @Autowired
    private ContributionRepository repository;

    @NonNull
    @SuppressWarnings("null")
    public Contribution createContribution(Contribution contribution) {
        return repository.save(contribution);
    }

    public List<Contribution> getAllContributions() {
        return repository.findAll();
    }

    public List<Contribution> getContributionsByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Contribution getContributionById(@NonNull Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteContribution(@NonNull Long id) {
        repository.deleteById(id);
    }
}