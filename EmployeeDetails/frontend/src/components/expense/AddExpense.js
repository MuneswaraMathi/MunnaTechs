import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import "../contribution/saveContribution.css";

export default function AddExpense() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    activityName: "",
    date: "",
    amount: "",
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

    if (!form.description.trim()) {
      validationErrors.description = "Description is required";
    }

    if (!form.activityName) {
      validationErrors.activityName = "Activity Name is required";
    }

    if (!form.date) {
      validationErrors.date = "Date is required";
    }

    if (!form.amount) {
      validationErrors.amount = "Amount is required";
    } else if (Number(form.amount) <= 0) {
      validationErrors.amount = "Amount must be greater than 0";
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
        amount: Number(form.amount),
      };
      await axios.post(`${API_BASE_URL}/expenses/addExpense`, payload);
      logger.info("Expense saved successfully:", payload.name);
      navigate("/expenses/showExpenses");
    } catch (err) {
      logger.error("Error saving expense:", err);
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
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            onBlur={() => handleBlur("description")}
          />
          {errors.description && (
            <p className="error-text">{errors.description}</p>
          )}
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            className="form-input"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            onBlur={() => handleBlur("date")}
          />
          {errors.date && <p className="error-text">{errors.date}</p>}
        </div>

        <div>
          <input
            type="number"
            className="form-input"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            onBlur={() => handleBlur("amount")}
          />
          {errors.amount && <p className="error-text">{errors.amount}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>
    </div>
  );
}
