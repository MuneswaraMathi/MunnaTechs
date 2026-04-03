package com.example.contributions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ContributionRepository extends JpaRepository<Contribution, Long> {
    List<Contribution> findByEmail(String email);

    @Query("SELECT c.activityName, SUM(c.amount) FROM Contribution c GROUP BY c.activityName")
    List<Object[]> findTotalByActivityName();
}