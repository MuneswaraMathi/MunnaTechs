package com.example.expenses;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    private static final Logger logger = LoggerFactory.getLogger(ExpenseController.class);

    @Autowired
    private ExpenseService service;

    @PostMapping("/addExpense")
    public ResponseEntity<?> addExpense(@RequestBody Expense expense) {
        logger.info("Received expense request - Name: {}, ActivityName: {}, Amount: {}",
            expense.getName(), expense.getActivityName(), expense.getAmount());
        try {
            if (expense.getDate() == null) {
                expense.setDate(new Date());
            }
            Expense saved = service.createExpense(expense);
            logger.info("Expense saved successfully with ID: {}", saved.getId());
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            logger.error("Error saving expense: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to save expense"));
        }
    }

    @GetMapping("/showExpenses")
    public ResponseEntity<List<Expense>> getAllExpenses() {
        logger.debug("Fetching all expenses");
        List<Expense> expenses = service.getAllExpenses();
        logger.info("Retrieved {} expenses", expenses.size());
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/showExpense/{id}")
    public ResponseEntity<?> getExpenseById(@PathVariable Long id) {
        logger.debug("Fetching expense with ID: {}", id);
        if (id == null) {
            logger.warn("Expense ID is null");
            return ResponseEntity.status(400).body(Map.of("error", "Expense ID cannot be null"));
        }
        Expense expense = service.getExpenseById(id);
        if (expense == null) {
            logger.warn("Expense not found with ID: {}", id);
            return ResponseEntity.status(404).body(Map.of("error", "Expense not found"));
        }
        logger.info("Retrieved expense: {}", expense);
        return ResponseEntity.ok(expense);
    }

    @PutMapping("/updateExpense/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        logger.info("Updating expense with ID: {}", id);
        Expense updated = service.updateExpense(id, expense);
        if (updated == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Expense not found"));
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/deleteExpense/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        logger.info("Deleting expense with ID: {}", id);
        if (id == null) {
            logger.warn("Expense ID is null");
            return ResponseEntity.status(400).body(Map.of("error", "Expense ID cannot be null"));
        }
        service.deleteExpense(id);
        logger.info("Expense deleted successfully with ID: {}", id);
        return ResponseEntity.ok(Map.of("message", "Expense deleted successfully"));
    }

    @GetMapping("/totalExpensesByActivity")
    public ResponseEntity<List<Map<String, Object>>> getTotalExpensesByActivity() {
        logger.info("Fetching total expenses by activity");
        return ResponseEntity.ok(service.getTotalExpensesByActivity());
    }
}
