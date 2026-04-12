package com.example.expenses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT e.activityName, SUM(e.amount) FROM Expense e GROUP BY e.activityName")
    List<Object[]> findTotalByActivityName();
}
