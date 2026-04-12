import React, { useEffect, useState } from "react";
import axios from "axios";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import { updateExpenseById, deleteExpenseById } from "./editExpense";
import "../contribution/showContribution.css";
import "../address/showAddress.css";

const ADMIN_EMAIL = "mrao.mathi@gmail.com";

export default function ShowExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [totals, setTotals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const isAdmin = localStorage.getItem("email") === ADMIN_EMAIL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expensesRes, totalsRes, activitiesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/expenses/showExpenses`),
        axios.get(`${API_BASE_URL}/expenses/totalExpensesByActivity`),
        axios.get(`${API_BASE_URL}/activities/showActivities`),
      ]);
      setExpenses(expensesRes.data);
      setTotals(totalsRes.data);
      setActivities(activitiesRes.data);
    } catch (err) {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditForm({ ...expense });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateExpenseById(editingId, editForm);
      setEditingId(null);
      fetchData();
    } catch (err) {
      alert("Failed to update expense");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await deleteExpenseById(id);
      fetchData();
    } catch (err) {
      alert("Failed to delete expense");
    }
  };

  if (loading) return <p className="loading-text">Loading expenses...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const filteredExpenses = selectedActivity
    ? expenses.filter((e) => e.activityName === selectedActivity)
    : [];

  const filteredTotals = selectedActivity
    ? totals.filter((t) => t.activityName === selectedActivity)
    : [];

  const total = filteredTotals.reduce((sum, t) => sum + Number(t.total), 0);

  return (
    <div className="contributions-container">
      <NavDropdowns />

      <div className="month-header" style={{ marginTop: 0 }}>
        Expenses by Activity
      </div>

      <select
        className="input-field"
        value={selectedActivity}
        onChange={(e) => setSelectedActivity(e.target.value)}
        style={{ marginBottom: "16px", width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ddd" }}
      >
        <option value="">-- Select an Activity --</option>
        {activities.map((a) => (
          <option key={a.id} value={a.activityName}>
            {a.activityName}
          </option>
        ))}
      </select>

      {selectedActivity && (
        filteredExpenses.length === 0 ? (
          <p className="loading-text">No expenses found for this activity.</p>
        ) : (
          <>
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "12px",
                  marginBottom: "12px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {editingId === expense.id && isAdmin ? (
                  <>
                    {["name", "description", "activityName", "date", "amount"].map(
                      (field) => (
                        <input
                          key={field}
                          name={field}
                          value={editForm[field] || ""}
                          onChange={handleChange}
                          placeholder={field}
                          type={
                            field === "date"
                              ? "date"
                              : field === "amount"
                              ? "number"
                              : "text"
                          }
                          style={{
                            display: "block",
                            width: "100%",
                            marginBottom: "8px",
                            padding: "6px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                          }}
                        />
                      )
                    )}
                    <div className="address-actions">
                      <button onClick={handleSave} className="btn btn-save">
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>Name:</strong> {expense.name}
                    </div>
                    <div>
                      <strong>Description:</strong> {expense.description}
                    </div>
                    <div>
                      <strong>Activity Name:</strong> {expense.activityName}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Amount:</strong> ₹{" "}
                      {Number(expense.amount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    {isAdmin && (
                      <div className="address-actions">
                        <button
                          onClick={() => handleEditClick(expense)}
                          className="btn btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="btn btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <div
              className="contribution-card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#dc3545",
                color: "#fff",
                borderColor: "#dc3545",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "16px" }}>
                Total — {selectedActivity}
              </span>
              <span style={{ fontWeight: 700, fontSize: "16px" }}>
                ₹{" "}
                {total.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </>
        )
      )}
    </div>
  );
}
