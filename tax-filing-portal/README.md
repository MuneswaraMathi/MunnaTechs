# Tax Filing Portal

A full-stack web application built with **React** (frontend) and **Spring Boot** (backend).

## Features

- **Registration Page** – email, password, confirm password, mobile number with full frontend + backend validations
- **Login Page** – email & password authentication with server-side session management
- **Profile Page** – protected route, shows user details; accessible only after login
- **Logout** – button on top-right of navbar; invalidates the server session and clears client storage

---

## Project Structure

```
tax-filing-portal/
├── backend/          # Spring Boot application (port 8080)
│   └── src/main/java/com/taxfiling/backend/
│       ├── TaxFilingApplication.java
│       ├── config/SecurityConfig.java
│       ├── controller/AuthController.java
│       ├── model/User.java
│       └── repository/UserRepository.java
└── frontend/         # React application (port 3000)
    └── src/
        ├── App.js
        ├── components/Navbar.js
        └── pages/
            ├── Register.js
            ├── Login.js
            └── Profile.js
```

---

## Getting Started

### Backend

```bash
cd tax-filing-portal/backend
mvn spring-boot:run
```

The API runs on `http://localhost:8080`.

### Frontend

```bash
cd tax-filing-portal/frontend
npm install
npm start
```

The UI runs on `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/auth/register`  | Register a new user      |
| POST   | `/api/auth/login`     | Login and create session |
| GET    | `/api/auth/profile`   | Get logged-in user info  |
| POST   | `/api/auth/logout`    | Logout and invalidate session |

---

## Validation Rules

### Registration
| Field            | Rules |
|------------------|-------|
| Email            | Required, valid email format |
| Password         | Min 6 chars, at least 1 uppercase, at least 1 digit |
| Confirm Password | Must match password |
| Mobile Number    | 10-digit Indian number (starts with 6–9) |

### Login
| Field    | Rules |
|----------|-------|
| Email    | Required, valid email format |
| Password | Required |

---

## Tech Stack

- **Frontend**: React 18, React Router v6, Axios
- **Backend**: Spring Boot 3.2, Spring Security, Spring Data JPA, H2 (in-memory)
- **Session**: HTTP session (server-side, cookie-based)
- **Security**: BCrypt password hashing, CORS configured for localhost:3000
