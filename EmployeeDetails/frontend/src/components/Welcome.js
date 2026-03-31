import { Link } from 'react-router-dom';

export default function Welcome() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('email');

    return (
            <div style={{ position: 'right', zIndex: 1,padding: "40px", display: "flex" }}>

              <div>
                <Link 
                      to="/profile" 
                      style={{
                        color: '#007bff',
                        textDecoration: 'none',
                        padding: '8px 15px',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'}
                    >
                      My Account
                  </Link>
              </div>

                <div style={{ 
                    position: "absolute",
                    top: 0,
                    right: 0,
                    padding: "20px",
                    textAlign: "right"
                }}>
                    <h6>Welcome! {userName}</h6>
                </div>

            </div>
    );
  }