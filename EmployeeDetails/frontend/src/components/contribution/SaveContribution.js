import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from '../../utils/logger';
import NavDropdowns from '../NavDropdowns';
import "./saveContribution.css";
import {validateContributionForm} from "./contributionValidation";

export default function SaveContribution(){
  const [form,setForm] = useState({ name:'', email:'',phoneNumber:'', amount:'' });
const [errors, setErrors] = useState({});
const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    logger.info('Submitting contribution form:', form);
    const validationErrors = validateContributionForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const resp = await axios.post('http://localhost:8080/contributions/saveContribution', form);
      logger.info('Contribution saved successfully:', resp.data);
      logger.debug('Amount saved:', resp.data.amount);
      navigate('/contributions/showContributions');
    } catch (err) {
      logger.error('Error saving contribution:', err);
      logger.error('Error details:', err.response?.data || err.message);
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  logger.debug('SaveContribution component rendered');

  return (
      <div className="contribution-container">
      <NavDropdowns />
      <form onSubmit={submitForm} className="contribution-form">
        <div>
          <input
            className="form-input"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          {errors.name && (
            <p className="error-text">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            className="form-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="error-text">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            className="form-input"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={(e) =>
              setForm({ ...form, phoneNumber: e.target.value })
            }
          />
          {errors.phoneNumber && (
            <p className="error-text">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            className="form-input"
            placeholder="Contribution Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />
          {errors.amount && (
            <p className="error-text">{errors.amount}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
