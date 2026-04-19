import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import {
  getPersonalInfoByEmail,
  updatePersonalInfoById
} from "./editPersonalInfo";
import '../contribution/showContribution.css';
import '../address/showAddress.css';

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
          Personal Info
        </div>

        {(!personalInfos || personalInfos.length === 0) ? (
          <p style={{ color: "#fff", fontSize: "16px", textAlign: "center" }}>No personal info found.</p>
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
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>First Name</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Last Name</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Phone</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Email</th>
                  <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "14px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {personalInfos.map((personalInfo, index) => (
                  <tr key={personalInfo.id} style={{
                    borderBottom: "1px solid #eee",
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
                  }}>
                    {editingId === personalInfo.id ? (
                      <>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="firstName" value={editForm.firstName || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="lastName" value={editForm.lastName || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="phoneNumber" value={editForm.phoneNumber || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="email" value={editForm.email || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                          <button onClick={updatePersonalInfo} className="btn btn-save" style={{ marginBottom: "4px" }}>Save</button>
                          <button onClick={() => setEditingId(null)} className="btn btn-cancel">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{personalInfo.firstName}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{personalInfo.lastName}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{personalInfo.phoneNumber}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px", whiteSpace: "nowrap" }}>{personalInfo.email}</td>
                        <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                          <button onClick={() => handleEditClick(personalInfo)} className="btn btn-edit">Edit</button>
                        </td>
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
