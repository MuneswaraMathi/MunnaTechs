import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import {
  getAddressesByEmail,
  updateAddressById,
  deleteAddressById,
} from "./editAddress";
import "./showAddress.css";
import "../contribution/showContribution.css";

export default function ShowAddresses() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const email = localStorage.getItem("email");
      logger.info("Fetching addresses for:", email);
      const data = await getAddressesByEmail(email);
      const firstName = Array.isArray(data) ? data[0]?.firstName : data?.firstName;
      if (firstName) {
        localStorage.setItem("firstName", firstName);
      }
      setAddresses(data);
    } catch (err) {
      setError("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (addr) => {
    setEditingId(addr.id);
    setEditForm({ ...addr });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const updateAddress = async () => {
    await updateAddressById(editingId, editForm);
    setEditingId(null);
    fetchAddresses();
  };

  const deleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      await deleteAddressById(id);
      fetchAddresses();
    } catch {
      alert("Failed to delete address");
    }
  };

  if (loading) return <p className="loading-text">Loading addresses...</p>;
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
          Addresses
        </div>

        {(!addresses || addresses.length === 0) ? (
          <p style={{ color: "#fff", fontSize: "16px", textAlign: "center" }}>No address found.</p>
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
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Father Name</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>H.No</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: "14px" }}>Email</th>
                  <th style={{ padding: "10px 12px", textAlign: "center", fontSize: "14px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((addr, index) => (
                  <tr key={addr.id} style={{
                    borderBottom: "1px solid #eee",
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
                  }}>
                    {editingId === addr.id ? (
                      <>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="firstName" value={editForm.firstName || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="lastName" value={editForm.lastName || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="fatherName" value={editForm.fatherName || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="houseNumber" value={editForm.houseNumber || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input name="email" value={editForm.email || ""} onChange={handleChange} style={inputStyle} />
                        </td>
                        <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                          <button onClick={updateAddress} className="btn btn-save" style={{ marginBottom: "4px" }}>Save</button>
                          <button onClick={() => setEditingId(null)} className="btn btn-cancel">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{index + 1}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{addr.firstName}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{addr.lastName}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{addr.fatherName}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px" }}>{addr.houseNumber}</td>
                        <td style={{ padding: "8px 12px", fontSize: "14px", whiteSpace: "nowrap" }}>{addr.email}</td>
                        <td style={{ padding: "8px 12px", textAlign: "center", whiteSpace: "nowrap" }}>
                          <button onClick={() => handleEditClick(addr)} className="btn btn-edit">Edit</button>
                          <button onClick={() => deleteAddress(addr.id)} className="btn btn-delete">Delete</button>
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
