import axios from "axios";
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
        console.log('clear localStorage Data ...');
      localStorage.clear();
      navigate("/home");
    }
  };

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}