import React, { useEffect, useState } from "react";
import logger from "../../utils/logger";
import {
  getAddressesByEmail,
  updateAddressById,
  deleteAddressById,
} from "./editAddress";
import "./showAddress.css";

export default function ShowAddresses() {
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

  if (loading) return <p>Loading addresses...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="address-container">
      <h2>Addresses</h2>

      {addresses.map((addr) => (
        <div key={addr.id} className="address-card">
          {editingId === addr.id ? (
            <>
              {Object.keys(editForm).map((field) => (
                <input
                  key={field}
                  name={field}
                  value={editForm[field] || ""}
                  onChange={handleChange}
                  className="input-field"
                />
              ))}

              <div className="address-actions">
                <button
                  className="btn btn-save"
                  onClick={updateAddress}
                >
                  💾 Save
                </button>
                <button
                  className="btn btn-cancel"
                  onClick={() => setEditingId(null)}
                >
                  ❌ Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <strong>
                  Name: {addr.firstName} {addr.lastName}
                </strong>
              </div>
              <div>H.No: {addr.houseNumber}</div>
              <div>Street: {addr.streetName}</div>
              <div>LandMark: {addr.landMark}</div>
              <div>
                City: {addr.city}, {addr.state} {addr.postalCode}
              </div>
              <div>📞 {addr.mobileNumber}</div>
              <div>✉️ {addr.email}</div>

              <div className="address-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEditClick(addr)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteAddress(addr.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}