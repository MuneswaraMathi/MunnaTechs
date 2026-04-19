import React, { useEffect, useState } from "react";
import axios from "axios";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import "../contribution/showContribution.css";
import "../address/showAddress.css";

const ADMIN_EMAIL = "mrao.mathi@gmail.com";

export default function GenerateReport() {
  const [activities, setActivities] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [reportType, setReportType] = useState("contributions");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAdmin = localStorage.getItem("email") === ADMIN_EMAIL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesRes, contribRes, expensesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/activities/showActivities`),
          axios.get(`${API_BASE_URL}/contributions/showContributions`),
          axios.get(`${API_BASE_URL}/expenses/showExpenses`),
        ]);
        setActivities(activitiesRes.data);
        setContributions(contribRes.data);
        setExpenses(expensesRes.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRecords = () => {
    const data = reportType === "contributions" ? contributions : expenses;
    return data.filter((item) => {
      const matchActivity = !selectedActivity || item.activityName === selectedActivity;
      const matchDate =
        !selectedDate ||
        new Date(item.date).toISOString().substring(0, 10) === selectedDate;
      return matchActivity && matchDate;
    });
  };

  const records = filteredRecords();
  const total = records.reduce((sum, r) => sum + Number(r.amount), 0);

  const handleReport = () => {
    const isContributions = reportType === "contributions";
    const totalFormatted = total.toLocaleString("en-IN", { minimumFractionDigits: 2 });
    const themeColor = isContributions ? "#007bff" : "#dc3545";
    const label = isContributions ? "Contributions" : "Expenses";
    const activityLabel = selectedActivity || "All Activities";
    const dateLabel = selectedDate
      ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
      : "All Dates";

    let headerCols, rowBuilder;
    if (isContributions) {
      headerCols = `<th>S.No</th><th>Name</th><th>Email</th><th>Phone</th><th>Date</th><th style="text-align:right">Amount (\u20b9)</th>`;
      rowBuilder = (c, i) => `
        <tr style="border-bottom:1px solid #eee; background:${i % 2 === 0 ? "#fff" : "#f8f9fa"}">
          <td style="padding:8px 12px; font-size:13px">${i + 1}</td>
          <td style="padding:8px 12px; font-size:13px; white-space:nowrap">${c.name}</td>
          <td style="padding:8px 12px; font-size:13px; white-space:nowrap">${c.email}</td>
          <td style="padding:8px 12px; font-size:13px">${c.phoneNumber}</td>
          <td style="padding:8px 12px; font-size:13px">${new Date(c.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
          <td style="padding:8px 12px; font-size:13px; text-align:right; font-weight:600">${Number(c.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
        </tr>`;
    } else {
      headerCols = `<th>S.No</th><th>Name</th><th>Description</th><th>Date</th><th style="text-align:right">Amount (\u20b9)</th>`;
      rowBuilder = (e, i) => `
        <tr style="border-bottom:1px solid #eee; background:${i % 2 === 0 ? "#fff" : "#f8f9fa"}">
          <td style="padding:8px 12px; font-size:13px">${i + 1}</td>
          <td style="padding:8px 12px; font-size:13px">${e.name}</td>
          <td style="padding:8px 12px; font-size:13px">${e.description}</td>
          <td style="padding:8px 12px; font-size:13px">${new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
          <td style="padding:8px 12px; font-size:13px; text-align:right; font-weight:600">${Number(e.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
        </tr>`;
    }

    const colSpan = isContributions ? 5 : 4;
    const rows = records.map((r, i) => rowBuilder(r, i)).join("");
    const reportWindow = window.open("", "_blank", "width=900,height=700");
    reportWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${label} Report - ${activityLabel}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 30px; color: #333; }
          .report { max-width: 850px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px solid ${themeColor}; padding-bottom: 15px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: ${themeColor}; font-size: 24px; }
          .header p { margin: 4px 0 0; color: #666; font-size: 13px; }
          .report-title { text-align: center; font-size: 18px; font-weight: 700; margin-bottom: 5px; color: #333; }
          .report-subtitle { text-align: center; font-size: 14px; color: #666; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th { background: #007bff; color: #fff; padding: 10px 12px; font-size: 13px; text-align: left; }
          th:last-child { text-align: right; }
          .total-row td { background: ${themeColor}; color: #fff; padding: 10px 12px; font-weight: 700; font-size: 14px; }
          .footer { text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px dashed #ccc; color: #888; font-size: 12px; }
          @media print {
            body { padding: 15px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="report">
          <div class="header">
            <h1>Potumeraka Village</h1>
            <p>Community ${label} Report</p>
          </div>
          <div class="report-title">${label} Report — ${activityLabel}</div>
          <div class="report-subtitle">Date: ${dateLabel}</div>
          <table>
            <thead><tr>${headerCols}</tr></thead>
            <tbody>${rows}</tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="${colSpan}">Total — ${activityLabel}</td>
                <td style="text-align:right">${totalFormatted}</td>
              </tr>
            </tfoot>
          </table>
          <div class="footer">
            <p>Total ${label}: ${records.length} | Total Amount: \u20b9 ${totalFormatted}</p>
            <p>Generated on: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
          </div>
          <div class="no-print" style="text-align:center; margin-top:20px;">
            <button onclick="window.print()" style="padding:10px 30px; font-size:15px; background:${themeColor}; color:#fff; border:none; border-radius:5px; cursor:pointer;">Print Report</button>
          </div>
        </div>
      </body>
      </html>
    `);
    reportWindow.document.close();
  };

  if (loading) return <p className="loading-text">Loading data...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const selectActivityStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "98%",
    marginBottom: "12px",
  };

  const selectStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "96%",
    marginBottom: "12px",
  };

  

  const radioLabelStyle = {
    color: "#fff",
    fontSize: "16px",
    marginRight: "24px",
    cursor: "pointer",
  };

  const isContributions = reportType === "contributions";

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/village3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "30px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div style={{ width: "950px" }}>
        <NavDropdowns />

        <div className="month-header" style={{ marginTop: 0 }}>
          Generate Report
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={radioLabelStyle}>
            <input
              type="radio"
              name="reportType"
              value="contributions"
              checked={reportType === "contributions"}
              onChange={(e) => setReportType(e.target.value)}
              style={{ marginRight: "6px" }}
            />
            Contributions
          </label>
          <label style={radioLabelStyle}>
            <input
              type="radio"
              name="reportType"
              value="expenses"
              checked={reportType === "expenses"}
              onChange={(e) => setReportType(e.target.value)}
              style={{ marginRight: "6px" }}
            />
            Expenses
          </label>
        </div>

        <select
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
          style={selectActivityStyle}
        >
          <option value="">-- All Activities --</option>
          {activities.map((a) => (
            <option key={a.id} value={a.activityName}>
              {a.activityName}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={selectStyle}
        />

        {records.length === 0 ? (
          <p style={{ color: "#fff", fontSize: "16px", textAlign: "center" }}>
            No {reportType} found for the selected filters.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>S.No</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Name</th>
                  {isContributions ? (
                    <>
                      <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Email</th>
                      <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Phone</th>
                    </>
                  ) : (
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Description</th>
                  )}
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Date</th>
                  <th style={{ padding: "10px 12px", textAlign: "right", fontSize: "14px" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={record.id}
                    style={{
                      borderBottom: "1px solid #eee",
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
                    }}
                  >
                    <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                    <td style={{ padding: "8px 12px", fontSize: "14px", whiteSpace: "nowrap" }}>{record.name}</td>
                    {isContributions ? (
                      <>
                        <td style={{ padding: "8px 12px", fontSize: "14px", whiteSpace: "nowrap" }}>{record.email}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{record.phoneNumber}</td>
                      </>
                    ) : (
                      <td style={{ padding: "8px 12px", fontSize: "14px" }}>{record.description}</td>
                    )}
                    <td style={{ padding: "8px 12px", fontSize: "14px" }}>
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "8px 12px", fontSize: "14px", textAlign: "right", fontWeight: 600 }}>
                      {Number(record.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: isContributions ? "#007bff" : "#dc3545", color: "#fff" }}>
                  <td
                    colSpan={isContributions ? 5 : 4}
                    style={{ padding: "10px 12px", fontWeight: 700, fontSize: "15px" }}
                  >
                    Total — {selectedActivity || "All Activities"}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, fontSize: "15px" }}>
                    {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
            {isAdmin && (
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button onClick={handleReport} className="btn btn-report">
                  Print Report
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
