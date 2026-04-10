import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logger from '../utils/logger';
import API_BASE_URL from "../config/apiConfig";
import { getPersonalInfoByEmail } from './personalInfo/editPersonalInfo';
export default function Login(){
  const [form,setForm] = useState({ email:'', password:'' });
const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, form);
      localStorage.setItem('token', res.data.token);

      const personalInfo = await getPersonalInfoByEmail(form.email);
            const firstName = Array.isArray(personalInfo.data) ? personalInfo.data[0]?.firstName : personalInfo.data?.firstName;
            if (firstName) {
              localStorage.setItem("firstName", firstName);
            }

      console.log('firstName:', firstName);
      console.log('email:', res.data.email);
      localStorage.setItem('userName', res.data.userName);
      localStorage.setItem('email', res.data.email);
      // Redirect to profile page
      navigate('/profile');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || err.message));
    }
  };

  logger.debug('Login component rendered');

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative',
      zIndex: 1
    }}>
      <div style={{
        width: '400px',
        maxWidth: '90%',
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
      <h2>Login</h2>
        <form onSubmit={login} style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              placeholder="Email:" 
              value={form.email} 
              onChange={e=>setForm({...form, email:e.target.value})}
              style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input 
              placeholder="Password:" 
              type="password" 
              value={form.password} 
              onChange={e=>setForm({...form, password:e.target.value})}
              style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <button 
            type="submit"
            style={{ 
              width: '100%',
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Login
          </button>
      </form>
      <p className="login-text">
         don't have an account?{" "}
          <Link to="/register" className="login-link">
            Register
          </Link>
          {" | "}
          <Link to="/update-password" className="login-link">
            Update Password
          </Link>
        </p>
      </div>
    </div>
  );
}
