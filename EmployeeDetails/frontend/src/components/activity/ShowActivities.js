import axios from "axios";
import { useEffect, useState } from "react";
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
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
      const res = await axios.get("http://localhost:8080/activities/showActivities");
      const mapped = res.data.map((a) => {
        const d = new Date(a.startDate);
        return {
          ...a,
          monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
          monthLabel: d.toLocaleString("default", { month: "long", year: "numeric" }),
        };
      });
      setActivities(mapped);
      logger.info("Activities fetched:", mapped.length);
    } catch (err) {
      logger.error("Error fetching activities:", err);
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
      logger.error("Error updating activity:", err);
      alert("Failed to update activity");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;
    try {
      await deleteActivityById(id);
      fetchActivities();
    } catch (err) {
      logger.error("Error deleting activity:", err);
      alert("Failed to delete activity");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading activities...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ width: "700px", margin: "30px auto" }}>
      <NavDropdowns />
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (() => {
        const grouped = activities.reduce((acc, a) => {
          if (!acc[a.monthKey]) acc[a.monthKey] = { label: a.monthLabel, items: [] };
          acc[a.monthKey].items.push(a);
          return acc;
        }, {});
        const sortedKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
        return sortedKeys.map((key) => (
          <div key={key}>
            <div className="month-header">{grouped[key].label}</div>
            {grouped[key].items.map((activity) => (
              <div
                key={activity.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "12px",
                  marginBottom: "12px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {editingId === activity.id && isAdmin ? (
                  <>
                    {["activityName", "description", "estimationCost", "startDate", "endDate"].map((field) => (
                      <input
                        key={field}
                        name={field}
                        value={editForm[field] || ""}
                        onChange={handleChange}
                        placeholder={field}
                        type={field.includes("Date") ? "date" : field === "estimationCost" ? "number" : "text"}
                        style={{ display: "block", width: "100%", marginBottom: "8px", padding: "6px", borderRadius: "4px", border: "1px solid #ddd" }}
                      />
                    ))}
                    <div className="address-actions">
                      <button onClick={handleSave} className="btn btn-save">💾 Save</button>
                      <button onClick={() => setEditingId(null)} className="btn btn-cancel">❌ Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div><strong>Activity Name:</strong> {activity.activityName}</div>
                    <div><strong>Description:</strong> {activity.description}</div>
                    <div><strong>Estimation Cost:</strong> {activity.estimationCost}</div>
                    <div><strong>Start Date:</strong> {activity.startDate}</div>
                    <div><strong>End Date:</strong> {activity.endDate}</div>
                    {isAdmin && (
                      <div className="address-actions">
                        <button onClick={() => handleEditClick(activity)} className="btn btn-edit">✏️ Edit</button>
                        <button onClick={() => handleDelete(activity.id)} className="btn btn-delete">🗑 Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ));
      })()}
    </div>
  );
}
