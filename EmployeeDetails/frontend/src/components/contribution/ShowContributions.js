import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import { updateContributionById, deleteContributionById } from './editContribution';
import './showContribution.css';
import '../address/showAddress.css';

const ADMIN_EMAIL = "mrao.mathi@gmail.com";

export default function ShowContributions() {
  const [contributions, setContributions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const isAdmin = localStorage.getItem("email") === ADMIN_EMAIL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contribRes, activitiesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/contributions/showContributions`),
        axios.get(`${API_BASE_URL}/activities/showActivities`),
      ]);
      setContributions(contribRes.data);
      setActivities(activitiesRes.data);
    } catch (err) {
      setError("Failed to load contributions");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (contribution) => {
    setEditingId(contribution.id);
    setEditForm({ ...contribution });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateContributionById(editingId, editForm);
      setEditingId(null);
      fetchData();
    } catch (err) {
      alert("Failed to update contribution");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contribution?")) return;
    try {
      await deleteContributionById(id);
      fetchData();
    } catch (err) {
      alert("Failed to delete contribution");
    }
  };

  const handleReceipt = (contribution) => {
    const receiptDate = new Date(contribution.date).toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
    });
    const amount = Number(contribution.amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
    });
    const receiptWindow = window.open("", "_blank", "width=700,height=600");
    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${contribution.name}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 30px; color: #333; }
          .receipt { max-width: 550px; margin: 0 auto; border: 2px solid #007bff; border-radius: 10px; padding: 30px; }
          .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 15px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: #007bff; font-size: 24px; }
          .header p { margin: 4px 0 0; color: #666; font-size: 13px; }
          .receipt-title { text-align: center; font-size: 18px; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; color: #333; }
          .details { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .details td { padding: 8px 12px; font-size: 14px; border-bottom: 1px solid #eee; }
          .details td:first-child { font-weight: 600; color: #555; width: 40%; }
          .amount-row td { font-size: 16px; font-weight: 700; border-top: 2px solid #007bff; border-bottom: 2px solid #007bff; }
          .amount-row td:last-child { color: #007bff; }
          .footer { text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px dashed #ccc; color: #888; font-size: 12px; }
          .receipt-id { text-align: right; color: #999; font-size: 12px; margin-bottom: 10px; }
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
            <p>Community Contribution Receipt</p>
          </div>
          <div class="receipt-id">Receipt #: ${contribution.id}</div>
          <div class="receipt-title">Contribution Receipt</div>
          <table class="details">
            <tr><td>Name</td><td>${contribution.name}</td></tr>
            <tr><td>Email</td><td>${contribution.email}</td></tr>
            <tr><td>Phone</td><td>${contribution.phoneNumber}</td></tr>
            <tr><td>Activity</td><td>${contribution.activityName}</td></tr>
            <tr><td>Date</td><td>${receiptDate}</td></tr>
            <tr class="amount-row"><td>Amount (₹)</td><td>${amount}</td></tr>
          </table>
          <div class="footer">
            <p>Thank you for your contribution to Potumeraka Village!</p>
            <p>Generated on: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
          </div>
          <div class="no-print" style="text-align:center; margin-top:20px;">
            <button onclick="window.print()" style="padding:10px 30px; font-size:15px; background:#007bff; color:#fff; border:none; border-radius:5px; cursor:pointer;">Print Receipt</button>
          </div>
        </div>
      </body>
      </html>
    `);
    receiptWindow.document.close();
  };

  if (loading) return <p className="loading-text">Loading Contributions...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const filteredContributions = selectedActivity
    ? contributions.filter((c) => c.activityName === selectedActivity)
    : [];

  const total = filteredContributions.reduce((sum, c) => sum + Number(c.amount), 0);

  const inputStyle = {
    width: "100%",
    padding: "4px 6px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "13px",
    boxSizing: "border-box",
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
      <div style={{ width: "950px" }}>
        <NavDropdowns />

        <div className="month-header" style={{ marginTop: 0 }}>
          Contributions by Activity
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
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Email</th>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Phone</th>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Date</th>
                    <th style={{ padding: "10px 12px", textAlign: "right", fontSize: "14px" }}>Amount</th>
                    {isAdmin && (
                      <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "14px" }}>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredContributions.map((contribution, index) => (
                    <tr key={contribution.id} style={{
                      borderBottom: "1px solid #eee",
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
                    }}>
                      {editingId === contribution.id && isAdmin ? (
                        <>
                          <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                          <td style={{ padding: "8px 12px" }}>
                            <input name="name" value={editForm.name || ""} onChange={handleChange} style={inputStyle} />
                          </td>
                          <td style={{ padding: "8px 12px" }}>
                            <input name="email" value={editForm.email || ""} onChange={handleChange} style={inputStyle} />
                          </td>
                          <td style={{ padding: "8px 12px" }}>
                            <input name="phoneNumber" value={editForm.phoneNumber || ""} onChange={handleChange} style={inputStyle} />
                          </td>
                          <td style={{ padding: "8px 12px" }}>
                            <input name="date" type="date" value={editForm.date ? editForm.date.substring(0, 10) : ""} onChange={handleChange} style={inputStyle} />
                          </td>
                          <td style={{ padding: "8px 12px" }}>
                            <input name="amount" type="number" value={editForm.amount || ""} onChange={handleChange} style={{ ...inputStyle, textAlign: "right" }} />
                          </td>
                          <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                            <button onClick={handleSave} className="btn btn-save" style={{ marginBottom: "4px" }}>Save</button>
                            <button onClick={() => setEditingId(null)} className="btn btn-cancel">Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                          <td style={{ padding: "8px 12px", fontSize: "14px", whiteSpace: "nowrap" }}>{contribution.name}</td>
                          <td style={{ padding: "8px 12px", fontSize: "14px", whiteSpace: "nowrap" }}>{contribution.email}</td>
                          <td style={{ padding: "8px 12px", fontSize: "14px" }}>{contribution.phoneNumber}</td>
                          <td style={{ padding: "8px 12px", fontSize: "14px" }}>
                            {new Date(contribution.date).toLocaleDateString()}
                          </td>
                          <td style={{ padding: "8px 12px", fontSize: "14px", textAlign: "right", fontWeight: 600 }}>
                            {Number(contribution.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                          </td>
                          {isAdmin && (
                            <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                              <button onClick={() => handleEditClick(contribution)} className="btn btn-edit">Edit</button>
                              <button onClick={() => handleDelete(contribution.id)} className="btn btn-delete">Delete</button>
                              <button onClick={() => handleReceipt(contribution)} className="btn btn-receipt">Receipt</button>
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                    <td colSpan={isAdmin ? 6 : 5} style={{ padding: "10px 12px", fontWeight: 700, fontSize: "15px" }}>
                      Total — {selectedActivity}
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, fontSize: "15px" }}>
                      {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    {isAdmin && <td></td>}
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
