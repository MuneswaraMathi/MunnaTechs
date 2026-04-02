import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import {
  getPersonalInfoByEmail,
  updatePersonalInfoById
} from "./editPersonalInfo";
import './showPersonalInfo.css';

export default function ShowPersonalInfo() {

  const [personalInfos, setPersonalInfos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPersonalInfos();
  }, []);

  const fetchPersonalInfos = async () => {
    try {
      const email = localStorage.getItem('email');
      logger.info('email: ', email);

      const res = await getPersonalInfoByEmail(email);
      const firstName = Array.isArray(res.data) ? res.data[0]?.firstName : res.data?.firstName;
      if (firstName) {
        localStorage.setItem("firstName", firstName);
      }
      setPersonalInfos(res.data);
    } catch (err) {
      setError('Failed to load personal details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (personalInfo) => {
    setEditingId(personalInfo.id);
    setEditForm({ ...personalInfo });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const updatePersonalInfo = async () => {
    try {
      await updatePersonalInfoById(editingId, editForm);
      setEditingId(null);
      fetchPersonalInfos();
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert("Failed to update personal info");
    }
  };

  if (loading) return <p className="loading-text">Loading Personal Info...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="personal-container">
      <NavDropdowns />
      {personalInfos.map((personalInfo) => (
        <div key={personalInfo.id} className="personal-card">

          {editingId === personalInfo.id ? (
            <>
              <input name="firstName" value={editForm.firstName || ''} onChange={handleChange} />
              <input name="lastName" value={editForm.lastName || ''} onChange={handleChange} />
              <input name="phoneNumber" value={editForm.phoneNumber || ''} onChange={handleChange} />
              <input name="email" value={editForm.email || ''} onChange={handleChange} />

              <button onClick={updatePersonalInfo}>💾 Save</button>
              <button onClick={() => setEditingId(null)}>❌ Cancel</button>
            </>
          ) : (
            <>
              <div><strong>First Name:</strong> {personalInfo.firstName}</div>
              <div><strong>Last Name:</strong> {personalInfo.lastName}</div>
              <div><strong>Phone:</strong> {personalInfo.phoneNumber}</div>
              <div><strong>Email:</strong> {personalInfo.email}</div>

              <button onClick={() => handleEditClick(personalInfo)}>✏️ Edit</button>
            </>
          )}

        </div>
      ))}
    </div>
  );
}