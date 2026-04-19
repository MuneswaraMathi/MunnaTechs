import React, { useEffect, useState } from "react";
import axios from "axios";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import "./showContribution.css";
import "../address/showAddress.css";

export default function FundsReport() {
  const [activities, setActivities] = useState([]);
  const [allContributions, setAllContributions] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get(`${API_BASE_URL}/activities/showActivities`),
      axios.get(`${API_BASE_URL}/contributions/showContributions`),
    ])
      .then(([activitiesRes, contribRes]) => {
        setActivities(activitiesRes.data);
        setAllContributions(contribRes.data);
      })
      .catch(() => setError("Failed to load funds report"))
      .finally(() => setLoading(false));
  }, []);

  const filteredContributions = selectedActivity
    ? allContributions.filter((c) => c.activityName === selectedActivity)
    : [];

  const total = filteredContributions.reduce((sum, c) => sum + Number(c.amount), 0);

  if (loading) return <p className="loading-text">Loading funds report...</p>;
  if (error) return <p className="error-text">{error}</p>;

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
      <div style={{ width: "950px" }}>
        <NavDropdowns />

        <div className="month-header" style={{ marginTop: 0 }}>
          Funds Report by Activity
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
          filteredContributions.length === 0 ? (
            <p style={{ color: "#fff", fontSize: "16px", textAlign: "center" }}>No contributions found for this activity.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}>
                <thead>
                  <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>S.No</th>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Name</th>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Date</th>
                    <th style={{ padding: "10px 12px", textAlign: "right", fontSize: "14px" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContributions.map((c, index) => (
                    <tr key={c.id} style={{
                      borderBottom: "1px solid #eee",
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
                    }}>
                      <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                      <td style={{ padding: "8px 12px", fontSize: "14px" }}>{c.name}</td>
                      <td style={{ padding: "8px 12px", fontSize: "14px" }}>
                        {new Date(c.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "8px 12px", fontSize: "14px", textAlign: "right", fontWeight: 600 }}>
                        {Number(c.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                    <td colSpan={3} style={{ padding: "10px 12px", fontWeight: 700, fontSize: "15px" }}>
                      Total — {selectedActivity}
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, fontSize: "15px" }}>
                      {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
