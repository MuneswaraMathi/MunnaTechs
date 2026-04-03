import { Link } from 'react-router-dom';
import NavDropdowns from "./NavDropdowns";

export default function Profile() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const firstName = localStorage.getItem('firstName');
    const email = localStorage.getItem('email');

    return (
    <div style={{ width: "700px", margin: "30px auto" }}>
      <NavDropdowns />

            <div style={{ position: 'right', zIndex:1 ,padding: "40px", display: "flex"}}>
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
    );

  }