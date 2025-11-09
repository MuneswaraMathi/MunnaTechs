package com.munnatechs.employee.controller;

import com.munnatechs.employee.model.Employee;
import com.munnatechs.employee.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

  private final EmployeeRepository repository;

  public EmployeeController(EmployeeRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  public List<Employee> all() {
    return repository.findAll();
  }

  @PostMapping
  public Employee create(@RequestBody Employee employee) {
    return repository.save(employee);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Employee> get(@PathVariable Long id) {
    return repository.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody Employee updated) {
    return repository.findById(id)
      .map(emp -> {
        emp.setFirstName(updated.getFirstName());
        emp.setLastName(updated.getLastName());
        emp.setEmail(updated.getEmail());
        repository.save(emp);
        return ResponseEntity.ok(emp);
      })
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    return repository.findById(id)
      .map(emp -> {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
      })
      .orElse(ResponseEntity.notFound().build());
  }
}
