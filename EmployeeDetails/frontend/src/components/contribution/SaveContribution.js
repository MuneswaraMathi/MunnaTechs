import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from "../../utils/logger";
import NavDropdowns from "../NavDropdowns";
import API_BASE_URL from '../../config/apiConfig';
import "./saveContribution.css";
import {validateContributionForm} from "./contributionValidation";

export default function SaveContribution(){
  const [form,setForm] = useState({ name:'', email:'',phoneNumber:'', amount:'', activityName:'' });
const [errors, setErrors] = useState({});
const [activities, setActivities] = useState([]);
const navigate = useNavigate();

  const handleBlur = (field) => {
    const validationErrors = validateContributionForm(form);
    setErrors((prev) => {
      const updated = { ...prev };
      if (validationErrors[field]) {
        updated[field] = validationErrors[field];
      } else {
        delete updated[field];
      }
      return updated;
    });
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/activities/showActivities`)
      .then(res => setActivities(res.data))
      .catch(err => logger.error('Error fetching activities:', err));
  }, []);
  const submitForm = async (e) => {
    e.preventDefault();
    logger.info('Submitting contribution form:', form);
    const validationErrors = validateContributionForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const resp = await axios.post(`${API_BASE_URL}/contributions/saveContribution`, form);
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
            onBlur={() => handleBlur('name')}
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
            onBlur={() => handleBlur('email')}
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
            onBlur={() => handleBlur('phoneNumber')}
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
            onBlur={() => handleBlur('amount')}
          />
          {errors.amount && (
            <p className="error-text">{errors.amount}</p>
          )}
        </div>

        <div>
          <select
            className="form-input"
            value={form.activityName}
            onChange={(e) => setForm({ ...form, activityName: e.target.value })}
            onBlur={() => handleBlur('activityName')}
          >
            <option value="">-- Select Activity --</option>
            {activities.map((a) => (
              <option key={a.id} value={a.activityName}>{a.activityName}</option>
            ))}
          </select>
          {errors.activityName && (
            <p className="error-text">{errors.activityName}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
        </div>
      </div>
  );
}
