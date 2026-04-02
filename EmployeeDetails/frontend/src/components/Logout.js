import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
     await axios.post("http://localhost:8080/auth/logout", {}, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      navigate("/home");
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <p>Logging out...</p>
  );
}