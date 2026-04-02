import { Link } from 'react-router-dom';

export default function Home() {
  const home = async () => {
    try {
     await axios.post("http://localhost:8080/auth/home", {}, {
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
  color: '#007bff',
  textDecoration: 'none',
  padding: '8px 15px',
  borderRadius: '4px',
  transition: 'background-color 0.3s',
  backgroundColor: 'rgba(255, 255, 255, 0.8)'
};
  return (
    <div
      style={{
        backgroundImage: "url('/images/village3.jpg')",
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
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 0,
        padding: 0,
        paddingTop: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/aboutUs" style={linkStyle}>About Us</Link>
        <Link to="/services" style={linkStyle}>Services</Link>
      </div>
    </div>
  );
}
