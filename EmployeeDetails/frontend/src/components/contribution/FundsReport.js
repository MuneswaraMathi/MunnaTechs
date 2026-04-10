import React, { useEffect, useState } from "react";
import axios from "axios";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import "./showContribution.css";

const ADMIN_EMAIL = "mrao.mathi@gmail.com";

export default function FundsReport() {
  const [funds, setFunds] = useState([]);
  const [activities, setActivities] = useState([]);
  const [allContributions, setAllContributions] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("fundsActivity");

  const currentEmail = localStorage.getItem("email");
  const isAdmin = currentEmail === ADMIN_EMAIL;

  useEffect(() => {
    Promise.all([
      axios.get(`${API_BASE_URL}/contributions/totalFundsByActivity`),
      axios.get(`${API_BASE_URL}/activities/showActivities`),
      axios.get(`${API_BASE_URL}/contributions/showContributions`),
    ])
      .then(([fundsRes, activitiesRes, contribRes]) => {
        setFunds(fundsRes.data);
        setActivities(activitiesRes.data);
        setAllContributions(contribRes.data);
      })
      .catch(() => setError("Failed to load funds report"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = selectedActivity
    ? funds.filter((f) => f.activityName === selectedActivity)
    : [];

  const filteredContributions = selectedActivity
    ? allContributions.filter((c) => c.activityName === selectedActivity)
    : [];

  const total = filtered.reduce((sum, f) => sum + Number(f.total), 0);

  if (loading) return <p className="loading-text">Loading funds report...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="contributions-container">
      <NavDropdowns />

      {isAdmin && (
        <div style={{ display: "flex", borderBottom: "2px solid #007bff", marginBottom: "16px" }}>
          <button
            onClick={() => setActiveTab("fundsActivity")}
            style={{
              padding: "8px 20px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
              backgroundColor: activeTab === "fundsActivity" ? "#007bff" : "transparent",
              color: activeTab === "fundsActivity" ? "#fff" : "#007bff",
              borderRadius: "4px 4px 0 0",
            }}
          >
            Funds By Activity
          </button>
        </div>
      )}

      {isAdmin && activeTab === "fundsActivity" ? (
        <>
          <div className="month-header" style={{ marginTop: 0 }}>
            Total Funds Collected by Activity
          </div>

          <select
            className="input-field"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            style={{ marginBottom: "16px" }}
          >
            <option value="">-- Select an Activity --</option>
            {activities.map((a) => (
              <option key={a.id} value={a.activityName}>
                {a.activityName}
              </option>
            ))}
          </select>

          {selectedActivity && (
            filtered.length === 0 ? (
              <p className="loading-text">No contributions found for this activity.</p>
            ) : (
              <>
                {filteredContributions.map((c) => (
                  <div
                    key={c.id}
                    className="contribution-card"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "15px" }}>{c.name}</span>
                    <span style={{ color: "#28a745", fontWeight: 600, fontSize: "15px" }}>
                      ₹ {Number(c.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
                <div
                  className="contribution-card"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderColor: "#007bff",
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: "16px" }}>Total — {selectedActivity}</span>
                  <span style={{ fontWeight: 700, fontSize: "16px" }}>
                    ₹ {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </>
            )
          )}
        </>
      ) : !isAdmin ? (
        <p className="error-text">You do not have permission to view this page.</p>
      ) : null}
    </div>
  );
}
