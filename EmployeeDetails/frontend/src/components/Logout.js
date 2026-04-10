import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/apiConfig";

export default function Logout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
     await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      navigate("/");
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <p>Logging out...</p>
  );
}