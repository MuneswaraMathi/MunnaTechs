import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    axios
      .get('/api/auth/profile', { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          sessionStorage.removeItem('user');
          navigate('/login');
        } else {
          setError('Failed to load profile. Please try again.');
        }
      });
  }, [navigate]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="api-error">{error}</div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ textAlign: 'center', color: '#666' }}>
          Loading profile...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-card">
        <h2>👤 My Profile</h2>

        <div className="profile-field">
          <span className="field-label">Email</span>
          <span className="field-value">{profile.email}</span>
        </div>

        <div className="profile-field">
          <span className="field-label">Mobile Number</span>
          <span className="field-value">{profile.mobileNumber}</span>
        </div>
      </div>
    </>
  );
}

export default Profile;
