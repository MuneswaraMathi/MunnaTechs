import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";

export default function AddActivity() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    activityName: "",
    description: "",
    estimationCost: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const validationErrors = {};

    if (!form.activityName.trim()) {
      validationErrors.activityName = "Activity Name is required";
    }

    if (!form.description.trim()) {
      validationErrors.description = "Description is required";
    }

    if (!form.estimationCost) {
      validationErrors.estimationCost = "Estimation Cost is required";
    } else if (Number(form.estimationCost) <= 0) {
      validationErrors.estimationCost = "Estimation Cost must be greater than 0";
    }

    if (!form.startDate) {
      validationErrors.startDate = "Start Date is required";
    }

    if (!form.endDate) {
      validationErrors.endDate = "End Date is required";
    }

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      validationErrors.endDate = "End Date cannot be before Start Date";
    }

    return validationErrors;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = {
        ...form,
        estimationCost: Number(form.estimationCost),
      };
      await axios.post("http://localhost:8080/activities/addActivity", payload);
      logger.info("Activity saved successfully:", payload.activityName);
      navigate("/activities/showActivities");
    } catch (err) {
      logger.error("Error saving activity:", err);
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <NavDropdowns />
      <form onSubmit={submitForm} style={{ maxWidth: "560px" }}>
        <div style={{ marginBottom: "12px" }}>
          <input
            placeholder="Activity Name"
            value={form.activityName}
            onChange={(e) => setForm({ ...form, activityName: e.target.value })}
            style={{ width: "100%", padding: "10px" }}
          />
          {errors.activityName && <p className="error-text">{errors.activityName}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ width: "100%", padding: "10px", minHeight: "90px" }}
          />
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <input
            type="number"
            placeholder="Estimation Cost"
            value={form.estimationCost}
            onChange={(e) => setForm({ ...form, estimationCost: e.target.value })}
            style={{ width: "100%", padding: "10px" }}
          />
          {errors.estimationCost && <p className="error-text">{errors.estimationCost}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Start Date</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            style={{ width: "100%", padding: "10px" }}
          />
          {errors.startDate && <p className="error-text">{errors.startDate}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>End Date</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            style={{ width: "100%", padding: "10px" }}
          />
          {errors.endDate && <p className="error-text">{errors.endDate}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Save Activity
        </button>
      </form>
    </div>
  );
}
