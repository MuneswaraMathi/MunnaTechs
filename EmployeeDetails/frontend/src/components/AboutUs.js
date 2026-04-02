import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundImage: "url('/images/village3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "24px",
          borderRadius: "10px",
          width: "420px",
          maxWidth: "90%",
        }}
      >
        <h2 style={{ marginTop: 0 }}>About Us</h2>
        <p>Village Development Office Details</p>
        <p style={{ marginBottom: "8px" }}>
          Address:
          <br />
          Village Development Office
          <br />
          Potumeraka Main Road
          <br />
          Potumeraka, Andhra Pradesh 522264
        </p>
        <Link to="/home" style={{ color: "#007bff", textDecoration: "none" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
