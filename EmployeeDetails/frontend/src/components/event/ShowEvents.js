import axios from "axios";
import { useEffect, useState } from "react";
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from "../../config/apiConfig";
import { updateEventById, deleteEventById } from "./editEvent";
import "../address/showAddress.css";
import "../contribution/showContribution.css";

const ADMIN_EMAIL = "mrao.mathi@gmail.com";

export default function ShowEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const isAdmin = localStorage.getItem("email") === ADMIN_EMAIL;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/events/showEvents`);
      const mapped = res.data.map((e) => {
        const d = new Date(e.startDate);
        return {
          ...e,
          monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
          monthLabel: d.toLocaleString("default", { month: "long", year: "numeric" }),
        };
      });
      setEvents(mapped);
      logger.info("Events fetched:", mapped.length);
    } catch (err) {
      logger.error("Error fetching events:", err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (event) => {
    setEditingId(event.id);
    setEditForm({ ...event });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateEventById(editingId, editForm);
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      logger.error("Error updating event:", err);
      alert("Failed to update event");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEventById(id);
      fetchEvents();
    } catch (err) {
      logger.error("Error deleting event:", err);
      alert("Failed to delete event");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading events...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

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
      <div style={{ width: "700px" }}>
      <NavDropdowns />
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (() => {
        const grouped = events.reduce((acc, e) => {
          if (!acc[e.monthKey]) acc[e.monthKey] = { label: e.monthLabel, items: [] };
          acc[e.monthKey].items.push(e);
          return acc;
        }, {});
        const sortedKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
        return sortedKeys.map((key) => (
          <div key={key}>
            <div className="month-header">{grouped[key].label}</div>
            {grouped[key].items.map((event) => (
              <div
                key={event.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "12px",
                  marginBottom: "12px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {editingId === event.id && isAdmin ? (
                  <>
                    {["eventName", "description", "startDate", "endDate"].map((field) =>
                      field === "description" ? (
                        <textarea
                          key={field}
                          name={field}
                          value={editForm[field] || ""}
                          onChange={handleChange}
                          placeholder="Description"
                          rows={3}
                          style={{ display: "block", width: "100%", marginBottom: "8px", padding: "6px", borderRadius: "4px", border: "1px solid #ddd", resize: "vertical" }}
                        />
                      ) : (
                        <input
                          key={field}
                          name={field}
                          value={editForm[field] || ""}
                          onChange={handleChange}
                          placeholder={field}
                          type={field.includes("Date") ? "date" : "text"}
                          style={{ display: "block", width: "100%", marginBottom: "8px", padding: "6px", borderRadius: "4px", border: "1px solid #ddd" }}
                        />
                      )
                    )}
                    <div className="address-actions">
                      <button onClick={handleSave} className="btn btn-save">Save</button>
                      <button onClick={() => setEditingId(null)} className="btn btn-cancel">Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div><strong>Event Name:</strong> {event.eventName}</div>
                    <div><strong>Description:</strong> {event.description}</div>
                    <div><strong>Start Date:</strong> {event.startDate}</div>
                    <div><strong>End Date:</strong> {event.endDate}</div>
                    {isAdmin && (
                      <div className="address-actions">
                        <button onClick={() => handleEditClick(event)} className="btn btn-edit">Edit</button>
                        <button onClick={() => handleDelete(event.id)} className="btn btn-delete">Delete</button>
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
    </div>
  );
}
