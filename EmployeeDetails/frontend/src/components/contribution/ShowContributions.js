import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import { getContributionsByEmail } from './editContribution';
import './showContribution.css';

export default function ShowContributions() {
  const navigate = useNavigate();
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
      const contributionsData = res.data.map(contribution => {
        const d = new Date(contribution.date);
        return {
          id: contribution.id,
          name: contribution.name,
          amount: contribution.amount,
          email: contribution.email,
          phoneNumber: contribution.phoneNumber,
          date: d.toLocaleDateString(),
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

  if (loading) return <p className="loading-text">Loading Contributions...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
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
                <div><strong>Name:</strong> {contribution.name}</div>
                <div><strong>Amount:</strong> {contribution.amount}</div>
                <div><strong>Email:</strong> {contribution.email}</div>
                <div><strong>Phone:</strong> {contribution.phoneNumber}</div>
                <div><strong>Date:</strong> {contribution.date}</div>
              </div>
            ))}
          </div>
        ));
      })()}
    </div>
  );
}