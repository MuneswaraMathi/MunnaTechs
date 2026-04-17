import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import "../contribution/saveContribution.css";

export default function AddTeam() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    mobileNumber: "",
    email: "",
    activityName: "",
  });
  const [errors, setErrors] = useState({});
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/activities/showActivities`)
      .then((res) => setActivities(res.data))
      .catch((err) => logger.error("Error fetching activities:", err));
  }, []);

  const validateForm = () => {
    const validationErrors = {};

    if (!form.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!form.fatherName.trim()) {
      validationErrors.fatherName = "Father Name is required";
    }

    if (!form.mobileNumber.trim()) {
      validationErrors.mobileNumber = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(form.mobileNumber.trim())) {
      validationErrors.mobileNumber = "Mobile Number must be 10 digits";
    }

    if (!form.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
      validationErrors.email = "Invalid email format";
    }

    if (!form.activityName) {
      validationErrors.activityName = "Activity Name is required";
    }

    return validationErrors;
  };

  const handleBlur = (field) => {
    const validationErrors = validateForm();
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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/team/saveTeam`, form);
      logger.info("Team member saved successfully:", form.name);
      navigate("/team/showTeam");
    } catch (err) {
      logger.error("Error saving team member:", err);
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="contribution-container">
      <NavDropdowns />
      <form onSubmit={submitForm} className="contribution-form">
        <div>
          <label>Activity Selection</label>
          <select
            className="form-input"
            value={form.activityName}
            onChange={(e) =>
              setForm({ ...form, activityName: e.target.value })
            }
            onBlur={() => handleBlur("activityName")}
          >
            <option value="">-- Select Activity --</option>
            {activities.map((a) => (
              <option key={a.id} value={a.activityName}>
                {a.activityName}
              </option>
            ))}
          </select>
          {errors.activityName && (
            <p className="error-text">{errors.activityName}</p>
          )}
        </div>

        <div>
          <input
            className="form-input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={() => handleBlur("name")}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div>
          <input
            className="form-input"
            placeholder="Father Name"
            value={form.fatherName}
            onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
            onBlur={() => handleBlur("fatherName")}
          />
          {errors.fatherName && (
            <p className="error-text">{errors.fatherName}</p>
          )}
        </div>

        <div>
          <input
            className="form-input"
            placeholder="Mobile Number"
            value={form.mobileNumber}
            onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
            onBlur={() => handleBlur("mobileNumber")}
          />
          {errors.mobileNumber && (
            <p className="error-text">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => handleBlur("email")}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Add Team Member
        </button>
      </form>
    </div>
  );
}
