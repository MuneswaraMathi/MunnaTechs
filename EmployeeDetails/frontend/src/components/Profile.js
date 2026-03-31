import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";

export default function Profile() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('email');

    return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>  

        <Dropdown
          title="PersonalInfo"
          items={[
            { label: "View PersonalInfo", to: "/personalDetails/showPersonalInfo" }
          ]}
        />

        <Dropdown
          title="Address"
          items={[
            { label: "Add Address", to: "/address/addAddress" },
            { label: "View Address", to: "/address/getAddress" }
          ]}
        />

        <Dropdown
          title="Contributions"
          items={[
            { label: "Add Contribution", to: "/contributions/saveContribution" },
            { label: "View Contributions", to: "/contributions/showContributions" }
          ]}
        />
      </div>

            <div style={{ position: 'right', zIndex:1 ,padding: "40px", display: "flex"}}>
                <div style={{ 
                    position: "absolute",
                    top: 15,
                    right: 20,
                    padding: "20px",
                    textAlign: "right"
                }}>
                    <h6>Welcome! {userName}</h6>
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