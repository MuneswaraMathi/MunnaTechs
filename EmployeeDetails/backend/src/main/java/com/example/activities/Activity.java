package com.example.activities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String activityName;

    @Column(length = 1000)
    private String description;

    @Column(name = "estimation_cost", precision = 10, scale = 2)
    private BigDecimal estimationCost;

    private LocalDate startDate;

    private LocalDate endDate;

    public Activity() {}

    public Activity(String activityName, String description, BigDecimal estimationCost,
                    LocalDate startDate, LocalDate endDate) {
        this.activityName = activityName;
        this.description = description;
        this.estimationCost = estimationCost;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getActivityName() { return activityName; }
    public void setActivityName(String activityName) { this.activityName = activityName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getEstimationCost() { return estimationCost; }
    public void setEstimationCost(BigDecimal estimationCost) { this.estimationCost = estimationCost; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
}
