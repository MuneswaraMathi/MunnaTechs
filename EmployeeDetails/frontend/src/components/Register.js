import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logger from "../utils/logger";
import API_BASE_URL from "../config/apiConfig";
import "./register.css";
import {validateRegisterForm} from "./register-validate";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const validateForm = () => {
  const newErrors = validateRegisterForm(form);
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
   };

  const handleBlur = (field) => {
    const validationErrors = validateRegisterForm(form);
    setErrors((prev) => {
      const updated = { ...prev };
      if (validationErrors[field]) {
        updated[field] = validationErrors[field];
      } else {
        delete updated[field];
      }
      return updated;
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, form);
      localStorage.setItem("firstName", form.firstName);
      localStorage.setItem("lastName", form.lastName);
      localStorage.setItem("email", form.email);
      navigate("/profile");
    } catch (err) {
      logger.error("Registration failed:", err);
      logger.error("Error details:", err.response?.data?.error || err.message);
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  logger.debug("Register component rendered");
  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/village3.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      padding: '30px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      <div style={{ width: "700px" }}>
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={submitForm} className="register-form">
          <div className="form-group">
            <input
              className="form-input"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              onBlur={() => handleBlur('firstName')}
            />
            {errors.firstName && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              onBlur={() => handleBlur('lastName')}
            />
            {errors.lastName && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.lastName}
              </p>
            )}
          </div>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="Email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
              onBlur={() => handleBlur('email')}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onBlur={() => handleBlur('password')}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.password}
              </p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              onBlur={() => handleBlur('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="PhoneNumber"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
              onBlur={() => handleBlur('phoneNumber')}
            />
            {errors.phoneNumber && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
      </div>
    </div>
  );
}
