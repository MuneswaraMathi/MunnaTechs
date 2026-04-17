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

  const ADMIN_EMAIL = "mrao.mathi@gmail.com";
  const isAdmin = localStorage.getItem("email") === ADMIN_EMAIL;

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

  const handleReceipt = () => {
    const fundsFormatted = fundsTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 });
    const expensesFormatted = expensesTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 });
    const balanceFormatted = balance.toLocaleString("en-IN", { minimumFractionDigits: 2 });
    const balanceColor = balance >= 0 ? "#28a745" : "#dc3545";
    const receiptWindow = window.open("", "_blank", "width=700,height=600");
    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Balance Report - ${selectedActivity}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 30px; color: #333; }
          .receipt { max-width: 550px; margin: 0 auto; border: 2px solid #007bff; border-radius: 10px; padding: 30px; }
          .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 15px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: #007bff; font-size: 24px; }
          .header p { margin: 4px 0 0; color: #666; font-size: 13px; }
          .receipt-title { text-align: center; font-size: 18px; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; color: #333; }
          .details { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .details td { padding: 10px 12px; font-size: 15px; border-bottom: 1px solid #eee; }
          .details td:first-child { font-weight: 600; color: #555; width: 50%; }
          .funds td:last-child { color: #28a745; font-weight: 700; }
          .expenses td:last-child { color: #dc3545; font-weight: 700; }
          .balance-row td { font-size: 17px; font-weight: 700; border-top: 2px solid #007bff; border-bottom: 2px solid #007bff; }
          .balance-row td:last-child { color: ${balanceColor}; }
          .footer { text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px dashed #ccc; color: #888; font-size: 12px; }
          @media print {
            body { padding: 15px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h1>Potumeraka Village</h1>
            <p>Community Balance Report</p>
          </div>
          <div class="receipt-title">Balance Report — ${selectedActivity}</div>
          <table class="details">
            <tr class="funds"><td>Funds Total</td><td style="text-align:right">₹ ${fundsFormatted}</td></tr>
            <tr class="expenses"><td>Expenses Total</td><td style="text-align:right">₹ ${expensesFormatted}</td></tr>
            <tr class="balance-row"><td>Balance Amount</td><td style="text-align:right">₹ ${balanceFormatted}</td></tr>
          </table>
          <div class="footer">
            <p>Potumeraka Village — Balance Report</p>
            <p>Generated on: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
          </div>
          <div class="no-print" style="text-align:center; margin-top:20px;">
            <button onclick="window.print()" style="padding:10px 30px; font-size:15px; background:#007bff; color:#fff; border:none; border-radius:5px; cursor:pointer;">Print Report</button>
          </div>
        </div>
      </body>
      </html>
    `);
    receiptWindow.document.close();
  };

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
          <>
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
              <span style={{ fontWeight: 600 }}>Funds Total</span>
              <span style={{ fontWeight: 700, color: "#28a745" }}>
                {fundsTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div style={{ ...rowStyle, backgroundColor: "#f8f9fa" }}>
              <span style={{ fontWeight: 600 }}>Expenses Total</span>
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
            {isAdmin && (
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button onClick={handleReceipt} className="btn btn-receipt">Receipt</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
