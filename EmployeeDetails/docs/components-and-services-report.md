# EmployeeDetails — Components & Services Report

## Backend (Java Spring Boot)

### Services

| Service | Package |
|---|---|
| `UserService` | `com.example.auth` |
| `PersonalInfoService` | `com.example.personal` |
| `AddressService` | `com.example.address` |
| `ActivityService` | `com.example.activities` |
| `ContributionService` | `com.example.contributions` |

### Controllers

| Controller | Package |
|---|---|
| `AuthController` | `com.example.auth` |
| `UserController` | `com.example.auth` |
| `PersonalInfoController` | `com.example.personal` |
| `AddressController` | `com.example.address` |
| `ActivityController` | `com.example.activities` |
| `ContributionController` | `com.example.contributions` |

### Models / Entities

| Entity | Package |
|---|---|
| `User` | `com.example.auth` |
| `PersonalInfo` | `com.example.personal` |
| `Address` | `com.example.address` |
| `Activity` | `com.example.activities` |
| `Contribution` | `com.example.contributions` |

### Repositories

- `UserRepository`
- `PersonalInfoRepository`
- `AddressRepository`
- `ActivityRepository`
- `ContributionRepository`

### Other Backend

- `SecurityConfig` / `JwtUtil` — JWT-based auth
- `UpdatePasswordRequest` — DTO
- `PersonalInfoResponse` / `AddressResponse` — Response DTOs
- `Error` (utils) — Error handling

---

## Frontend (React)

### Page-Level Components

| Component | Path |
|---|---|
| `Home` | `components/Home.js` |
| `Welcome` | `components/Welcome.js` |
| `Login` | `components/Login.js` |
| `Register` | `components/Register.js` |
| `Logout` | `components/Logout.js` |
| `Profile` | `components/Profile.js` |
| `UpdatePassword` | `components/UpdatePassword.js` |
| `Services` | `components/Services.js` |
| `AboutUs` | `components/AboutUs.js` |

### Feature Components

| Feature | Components |
|---|---|
| **Activity** | `ShowActivities`, `AddActivity`, `editActivity` |
| **Contribution** | `ShowContributions`, `SaveContribution`, `editContribution`, `FundsReport` |
| **Address** | `ShowAddresses`, `AddAddress`, `editAddress` |
| **Personal Info** | `ShowPersonalInfo`, `editPersonalInfo` |

### Shared / Navigation

- `NavDropdowns` — Navigation dropdowns
- `Dropdown` — Generic dropdown

### Validators

- `register-validate.js`
- `update-password-validate.js`
- `addressValidation.js`
- `contributionValidation.js`

### Config / Utils

- `apiConfig.js` — API base URL config
- `logger.js` — Logging utility
- `App.js` — Root component with routing
- `index.js` — Entry point

---

## Summary

5 domain modules (Auth, PersonalInfo, Address, Activities, Contributions), each with a full backend stack (Controller -> Service -> Repository -> Entity) and corresponding frontend CRUD components.
