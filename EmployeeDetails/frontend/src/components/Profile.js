import { Link } from 'react-router-dom';
import NavDropdowns from "./NavDropdowns";

export default function Profile() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const firstName = localStorage.getItem('firstName');
    const email = localStorage.getItem('email');

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
          <NavDropdowns />

          <div style={{ position: 'right', zIndex: 1, padding: "40px", display: "flex" }}>
            <div style={{
              position: "absolute",
              top: 15,
              right: 20,
              padding: "20px",
              textAlign: "right"
            }}>
              <h6>Welcome! {firstName}</h6>
            </div>

            <div>
              <Link
                to="/logout"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 20,
                  padding: "20px",
                  display: "flex",
                  alignItems: "right",
                  gap: "100px"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'}
              >
                logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}
