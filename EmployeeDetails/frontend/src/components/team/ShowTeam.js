import React, { useEffect, useState } from "react";
import axios from "axios";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import { updateTeamById, deleteTeamById } from "./editTeam";
import "../contribution/showContribution.css";
import "../address/showAddress.css";

const ADMIN_EMAIL = "mrao.mathi@gmail.com";

export default function ShowTeam() {
  const [teams, setTeams] = useState([]);
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
      const [teamsRes, activitiesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/team/showTeam`),
        axios.get(`${API_BASE_URL}/activities/showActivities`),
      ]);
      setTeams(teamsRes.data);
      setActivities(activitiesRes.data);
    } catch (err) {
      setError("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (member) => {
    setEditingId(member.id);
    setEditForm({ ...member });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateTeamById(editingId, editForm);
      setEditingId(null);
      fetchData();
    } catch (err) {
      alert("Failed to update team member");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;
    try {
      await deleteTeamById(id);
      fetchData();
    } catch (err) {
      alert("Failed to delete team member");
    }
  };

  if (loading) return <p className="loading-text">Loading team members...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const filteredTeams = selectedActivity
    ? teams.filter((t) => t.activityName === selectedActivity)
    : [];

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
          Team Members by Activity
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
          filteredTeams.length === 0 ? (
            <p style={{ color: "#fff", fontSize: "16px", textAlign: "center" }}>No team members found for this activity.</p>
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
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Father Name</th>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Mobile Number</th>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Email</th>
                    {isAdmin && (
                      <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "14px" }}>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((member, index) => (
                    <tr key={member.id} style={{
                      borderBottom: "1px solid #eee",
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
                    }}>
                      {editingId === member.id && isAdmin ? (
                        <>
                          <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                          <td style={{ padding: "8px 12px" }}>
                            <input name="name" value={editForm.name || ""} onChange={handleChange} style={inputStyle} />
                          </td>
                          <td style={{ padding: "8px 12px" }}>
                            <input name="fatherName" value={editForm.fatherName || ""} onChange={handleChange} style={inputStyle} />
                          </td>
                          <td style={{ padding: "8px 12px" }}>
                            <input name="mobileNumber" value={editForm.mobileNumber || ""} onChange={handleChange} style={inputStyle} />
                          </td>
                          <td style={{ padding: "8px 12px" }}>
                            <input name="email" value={editForm.email || ""} onChange={handleChange} style={inputStyle} />
                          </td>
                          <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                            <button onClick={handleSave} className="btn btn-save" style={{ marginBottom: "4px" }}>Save</button>
                            <button onClick={() => setEditingId(null)} className="btn btn-cancel">Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                          <td style={{ padding: "8px 12px", fontSize: "14px", whiteSpace: "nowrap" }}>{member.name}</td>
                          <td style={{ padding: "8px 12px", fontSize: "14px", whiteSpace: "nowrap" }}>{member.fatherName}</td>
                          <td style={{ padding: "8px 12px", fontSize: "14px" }}>{member.mobileNumber}</td>
                          <td style={{ padding: "8px 12px", fontSize: "14px", whiteSpace: "nowrap" }}>{member.email}</td>
                          {isAdmin && (
                            <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                              <button onClick={() => handleEditClick(member)} className="btn btn-edit">Edit</button>
                              <button onClick={() => handleDelete(member.id)} className="btn btn-delete">Delete</button>
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
