import React, { useEffect, useState } from "react";
import axios from "axios";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import "../contribution/showContribution.css";
import "../address/showAddress.css";

export default function BalanceReport() {
  const [activities, setActivities] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get(`${API_BASE_URL}/activities/showActivities`),
      axios.get(`${API_BASE_URL}/contributions/showContributions`),
      axios.get(`${API_BASE_URL}/expenses/showExpenses`),
    ])
      .then(([activitiesRes, contribRes, expensesRes]) => {
        setActivities(activitiesRes.data);
        setContributions(contribRes.data);
        setExpenses(expensesRes.data);
      })
      .catch(() => setError("Failed to load balance report"))
      .finally(() => setLoading(false));
  }, []);

  const fundsTotal = selectedActivity
    ? contributions
        .filter((c) => c.activityName === selectedActivity)
        .reduce((sum, c) => sum + Number(c.amount), 0)
    : 0;

  const expensesTotal = selectedActivity
    ? expenses
        .filter((e) => e.activityName === selectedActivity)
        .reduce((sum, e) => sum + Number(e.amount), 0)
    : 0;

  const balance = fundsTotal - expensesTotal;

  if (loading) return <p className="loading-text">Loading balance report...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    fontSize: "16px",
    borderBottom: "1px solid #eee",
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
      <div style={{ width: "750px" }}>
        <NavDropdowns />

        <div className="month-header" style={{ marginTop: 0 }}>
          Balance Report by Activity
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
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}>
            <div style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "12px 20px",
              fontSize: "16px",
              fontWeight: 700,
            }}>
              {selectedActivity}
            </div>

            <div style={{ ...rowStyle, backgroundColor: "#fff" }}>
              <span style={{ fontWeight: 600 }}>Funds Total by Activity</span>
              <span style={{ fontWeight: 700, color: "#28a745" }}>
                {fundsTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div style={{ ...rowStyle, backgroundColor: "#f8f9fa" }}>
              <span style={{ fontWeight: 600 }}>Expenses Total by Activity</span>
              <span style={{ fontWeight: 700, color: "#dc3545" }}>
                {expensesTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 20px",
              fontSize: "17px",
              fontWeight: 700,
              backgroundColor: balance >= 0 ? "#28a745" : "#dc3545",
              color: "#fff",
            }}>
              <span>Balance Amount</span>
              <span>
                {balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
