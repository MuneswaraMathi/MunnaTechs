import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logger from "../utils/logger";
import API_BASE_URL from "../config/apiConfig";
import { validateUpdatePasswordForm } from "./update-password-validate";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: localStorage.getItem("email") || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = validateUpdatePasswordForm(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    const validationErrors = validateUpdatePasswordForm(form);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        email: form.email.trim(),
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      };

      const res = await axios.post(`${API_BASE_URL}/auth/update-password`, payload);
      setSuccessMessage(res.data?.message || "Password updated successfully");
      logger.info("Password updated for email:", payload.email);
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      logger.error("Update password failed:", err);
      setServerError(err.response?.data?.error || "Failed to update password");
    }
  };

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
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "90%",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Update Password</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => handleBlur('email')}
              style={{ width: "100%", padding: "10px", fontSize: "16px", backgroundColor: "white", border: "1px solid #ddd", borderRadius: "5px" }}
            />
            {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              placeholder="Current Password"
              type="password"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              onBlur={() => handleBlur('currentPassword')}
              style={{ width: "100%", padding: "10px", fontSize: "16px", backgroundColor: "white", border: "1px solid #ddd", borderRadius: "5px" }}
            />
            {errors.currentPassword && <p style={{ color: "red", fontSize: "14px" }}>{errors.currentPassword}</p>}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              placeholder="New Password"
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              onBlur={() => handleBlur('newPassword')}
              style={{ width: "100%", padding: "10px", fontSize: "16px", backgroundColor: "white", border: "1px solid #ddd", borderRadius: "5px" }}
            />
            {errors.newPassword && <p style={{ color: "red", fontSize: "14px" }}>{errors.newPassword}</p>}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              placeholder="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              onBlur={() => handleBlur('confirmPassword')}
              style={{ width: "100%", padding: "10px", fontSize: "16px", backgroundColor: "white", border: "1px solid #ddd", borderRadius: "5px" }}
            />
            {errors.confirmPassword && <p style={{ color: "red", fontSize: "14px" }}>{errors.confirmPassword}</p>}
          </div>

          {serverError && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{serverError}</p>}
          {successMessage && <p style={{ color: "green", fontSize: "14px", marginBottom: "10px" }}>{successMessage}</p>}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Update Password
          </button>
        </form>

        <p className="login-text" style={{ marginTop: "16px" }}>
          Back to{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
      </div>
    </div>
  );
}

