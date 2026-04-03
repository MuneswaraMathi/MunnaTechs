package com.example.contributions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<Map<String, Object>> getTotalFundsByActivity() {
        List<Object[]> rows = repository.findTotalByActivityName();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : rows) {
            Map<String, Object> map = new HashMap<>();
            map.put("activityName", row[0] != null ? row[0] : "Unspecified");
            map.put("total", row[1]);
            result.add(map);
        }
        return result;
    }
}