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
        minHeight: '100vh',
        width: '100vw',

        display: 'flex',               // ✅ make it flex
        justifyContent: 'center',     // ✅ top
        alignItems: 'center',        // ✅ horizontal center
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginTop: '-799px'           // spacing from top
        }}
      >
        <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/login" style={linkStyle}>About Us</Link>
        <Link to="/login" style={linkStyle}>Services</Link>
      </div>
    </div>
  );
}
