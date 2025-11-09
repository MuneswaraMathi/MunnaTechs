# EmployeeDetails - Employee Management

This repository is a scaffold for an Employee Management application.

Structure:
- EmployeeDetails/backend/ : Java Spring Boot application (REST API)
- EmployeeDetails/frontend/: React application (UI)

Getting started (development):

Backend:
1. cd EmployeeDetails/backend
2. mvn spring-boot:run (or use your Maven wrapper if available)
   - The API will run on http://localhost:8080
   - Endpoints:
     - GET /api/employees
     - POST /api/employees
     - GET /api/employees/{id}
     - PUT /api/employees/{id}
     - DELETE /api/employees/{id}

Frontend:
1. cd EmployeeDetails/frontend
2. npm install
3. npm start
   - The React app will run on http://localhost:3000 and talk to the backend at http://localhost:8080/api.

Notes:
- The backend uses an in-memory H2 database for convenience; change application.properties for a persistent DB.
- CORS is enabled for all origins for simplicity; restrict for production use.
