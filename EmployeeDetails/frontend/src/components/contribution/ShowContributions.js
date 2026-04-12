import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import { getContributionsByEmail, updateContributionById, deleteContributionById } from './editContribution';
import './showContribution.css';
import '../address/showAddress.css';

const ADMIN_EMAIL = "mrao.mathi@gmail.com";

export default function ShowContributions() {
  const navigate = useNavigate();
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const isAdmin = localStorage.getItem("email") === ADMIN_EMAIL;

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const email = localStorage.getItem('email');
      logger.info('fetching contributions for email: ', email);
      const res = await getContributionsByEmail(email);
      const contributionsData = res.data.map(contribution => {
        const d = new Date(contribution.date);
        return {
          ...contribution,
          contributionName: contribution.activityName || contribution.contributionName || 'N/A',
          dateDisplay: d.toLocaleDateString(),
          monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
          monthLabel: d.toLocaleString('default', { month: 'long', year: 'numeric' }),
        };
      });
      setContributions(contributionsData);
    } catch (err) {
      setError('Failed to load contributions');
      console.error(err);
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
      fetchContributions();
    } catch (err) {
      logger.error("Error updating contribution:", err);
      alert("Failed to update contribution");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contribution?")) return;
    try {
      await deleteContributionById(id);
      fetchContributions();
    } catch (err) {
      logger.error("Error deleting contribution:", err);
      alert("Failed to delete contribution");
    }
  };

  if (loading) return <p className="loading-text">Loading Contributions...</p>;
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
      <div style={{ width: "700px" }}>
    <div className="contributions-container">
      <NavDropdowns />
      {contributions.length === 0 ? (
        <p className="loading-text">Contributions Not Found</p>
      ) : (() => {
        const grouped = contributions.reduce((acc, c) => {
          if (!acc[c.monthKey]) acc[c.monthKey] = { label: c.monthLabel, items: [] };
          acc[c.monthKey].items.push(c);
          return acc;
        }, {});
        const sortedKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
        return sortedKeys.map((key) => (
          <div key={key}>
            <div className="month-header">{grouped[key].label}</div>
            {grouped[key].items.map((contribution) => (
              <div key={contribution.id} className="contribution-card">
                {editingId === contribution.id && isAdmin ? (
                  <>
                    {["name", "email", "phoneNumber", "activityName", "amount"].map(
                      (field) => (
                        <input
                          key={field}
                          name={field}
                          value={editForm[field] || ""}
                          onChange={handleChange}
                          placeholder={field}
                          type={field === "amount" ? "number" : "text"}
                          style={{
                            display: "block",
                            width: "100%",
                            marginBottom: "8px",
                            padding: "6px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                          }}
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
                    <div><strong>Name:</strong> {contribution.name}</div>
                    <div><strong>Activity Name:</strong> {contribution.contributionName}</div>
                    <div><strong>Amount:</strong> {contribution.amount}</div>
                    <div><strong>Email:</strong> {contribution.email}</div>
                    <div><strong>Phone:</strong> {contribution.phoneNumber}</div>
                    <div><strong>Date:</strong> {contribution.dateDisplay}</div>
                    {isAdmin && (
                      <div className="address-actions">
                        <button onClick={() => handleEditClick(contribution)} className="btn btn-edit">Edit</button>
                        <button onClick={() => handleDelete(contribution.id)} className="btn btn-delete">Delete</button>
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
    </div>
  );
}
