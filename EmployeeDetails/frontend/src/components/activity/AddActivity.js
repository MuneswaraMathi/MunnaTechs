import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";

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
      const payload = {
        ...form,
        estimationCost: Number(form.estimationCost),
      };
      await axios.post(`${API_BASE_URL}/activities/addActivity`, payload);
      logger.info("Activity saved successfully:", payload.activityName);
      navigate("/activities/showActivities");
    } catch (err) {
      logger.error("Error saving activity:", err);
      alert("Error: " + (err.response?.data?.error || err.message));
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
      <NavDropdowns />
      <form onSubmit={submitForm} style={{ maxWidth: "560px" }}>
        <div style={{ marginBottom: "12px" }}>
          <input
            placeholder="Activity Name"
            value={form.activityName}
            onChange={(e) => setForm({ ...form, activityName: e.target.value })}
            onBlur={() => handleBlur('activityName')}
            style={{ width: "100%", padding: "10px" }}
          />
          {errors.activityName && <p className="error-text">{errors.activityName}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            onBlur={() => handleBlur('description')}
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
            onBlur={() => handleBlur('estimationCost')}
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
            onBlur={() => handleBlur('startDate')}
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
            onBlur={() => handleBlur('endDate')}
            style={{ width: "100%", padding: "10px" }}
          />
          {errors.endDate && <p className="error-text">{errors.endDate}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Save Activity
        </button>
      </form>
      </div>
    </div>
  );
}
