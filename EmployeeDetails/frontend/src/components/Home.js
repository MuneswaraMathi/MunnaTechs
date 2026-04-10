import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

export default function Home() {
  const home = async () => {
    try {
     await axios.post(`${API_BASE_URL}/auth/home`, {}, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
    }
   });
    } finally {
      console.log('clear localStorage Data...');
      localStorage.clear();
    }
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '12px 25px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    backgroundColor: '#007bff',
    fontWeight: '600',
    fontSize: '16px',
    border: '2px solid #fff',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  };

  const linkHoverStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#007bff',
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/village3.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
        padding: '70px 0 0 0',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        <h1
          style={{
            color: '#fff',
            fontSize: '48px',
            fontWeight: 'bold',
            margin: '0 0 15px 0',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            letterSpacing: '2px',
          }}
        >
            Potumeraka Village
        </h1>
        <p
          style={{
            color: '#f0f0f0',
            fontSize: '18px',
            margin: '0',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
          }}
        >
          Community Management System
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Link
          to="/register"
          style={linkStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
        >
          Register
        </Link>
        <Link
          to="/aboutUs"
          style={linkStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
        >
          About Us
        </Link>
        <Link
          to="/services"
          style={linkStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
        >
          Services
        </Link>
      </div>
    </div>
  );
}
