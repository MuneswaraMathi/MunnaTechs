import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logger from "../../utils/logger";
import { getContributionsByEmail } from './editContribution';
import './showContribution.css';

export default function ShowContributions() {

  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const email = localStorage.getItem('email');
      logger.info('email: ', email);
      const res = await getContributionsByEmail(email);
      setContributions(res.data);
    } catch (err) {
      setError('Failed to load contributions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading-text">Loading Contributions...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="contributions-container">
      <h2 className="contributions-title">Contributions</h2>

      {contributions.map((contribution) => (
        <div key={contribution.id} className="contribution-card">
          <div><strong>Name:</strong> {contribution.name}</div>
          <div><strong>Amount:</strong> {contribution.amount}</div>
          <div><strong>Email:</strong> {contribution.email}</div>
          <div><strong>Phone:</strong> {contribution.phoneNumber}</div>
          <div><strong>Date:</strong> {contribution.date}</div>
        </div>
      ))}
    </div>
  );
}