package com.example.activities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository repository;

    public Activity createActivity(@NonNull Activity activity) {
        return repository.save(activity);
    }

    public List<Activity> getAllActivities() {
        return repository.findAll();
    }

    public Activity getActivityById(@NonNull Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteActivity(@NonNull Long id) {
        repository.deleteById(id);
    }
}
