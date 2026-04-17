import axios from "axios";
import { useEffect, useState } from "react";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import { updateActivityById, deleteActivityById } from "./editActivity";
import "../address/showAddress.css";
import "../contribution/showContribution.css";

const ADMIN_EMAIL = "mrao.mathi@gmail.com";

export default function ShowActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const isAdmin = localStorage.getItem("email") === ADMIN_EMAIL;

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/activities/showActivities`);
      setActivities(res.data);
    } catch (err) {
      setError("Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (activity) => {
    setEditingId(activity.id);
    setEditForm({ ...activity });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateActivityById(editingId, editForm);
      setEditingId(null);
      fetchActivities();
    } catch (err) {
      alert("Failed to update activity");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;
    try {
      await deleteActivityById(id);
      fetchActivities();
    } catch (err) {
      alert("Failed to delete activity");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading activities...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

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
          Activities
        </div>

        {activities.length === 0 ? (
          <p style={{ color: "#fff", fontSize: "16px", textAlign: "center" }}>No activities found.</p>
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
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Activity Name</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Description</th>
                  <th style={{ padding: "10px 12px", textAlign: "right", fontSize: "14px" }}>Est. Cost</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Start Date</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>End Date</th>
                  {isAdmin && (
                    <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "14px" }}>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id} style={{
                    borderBottom: "1px solid #eee",
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
                  }}>
                    {editingId === activity.id && isAdmin ? (
                      <>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="activityName" value={editForm.activityName || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="description" value={editForm.description || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="estimationCost" type="number" value={editForm.estimationCost || ""} onChange={handleChange} style={{ ...inputStyle, textAlign: "right" }} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="startDate" type="date" value={editForm.startDate || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="endDate" type="date" value={editForm.endDate || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                          <button onClick={handleSave} className="btn btn-save" style={{ marginBottom: "4px" }}>Save</button>
                          <button onClick={() => setEditingId(null)} className="btn btn-cancel">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{activity.activityName}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{activity.description}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px", textAlign: "right", fontWeight: 600 }}>
                          {Number(activity.estimationCost).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{activity.startDate}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{activity.endDate}</td>
                        {isAdmin && (
                          <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                            <button onClick={() => handleEditClick(activity)} className="btn btn-edit">Edit</button>
                            <button onClick={() => handleDelete(activity.id)} className="btn btn-delete">Delete</button>
                          </td>
                        )}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
