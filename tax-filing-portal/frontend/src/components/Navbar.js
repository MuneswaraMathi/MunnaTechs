import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      // ignore errors on logout
    }
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <span className="brand">Tax Filing Portal</span>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
