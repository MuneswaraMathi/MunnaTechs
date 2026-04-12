package com.example.expenses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository repository;

    @NonNull
    @SuppressWarnings("null")
    public Expense createExpense(Expense expense) {
        return repository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    public Expense getExpenseById(@NonNull Long id) {
        return repository.findById(id).orElse(null);
    }

    public Expense updateExpense(@NonNull Long id, Expense expense) {
        Expense existing = repository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setName(expense.getName());
        existing.setDescription(expense.getDescription());
        existing.setActivityName(expense.getActivityName());
        existing.setDate(expense.getDate());
        existing.setAmount(expense.getAmount());
        return repository.save(existing);
    }

    public void deleteExpense(@NonNull Long id) {
        repository.deleteById(id);
    }

    public List<Map<String, Object>> getTotalExpensesByActivity() {
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
