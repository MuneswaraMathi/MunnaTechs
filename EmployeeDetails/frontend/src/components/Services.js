import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/images/village3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "70px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "24px",
          borderRadius: "10px",
          width: "520px",
          maxWidth: "92%",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Our Services</h2>
        <p>We focus on village development through transparent community support.</p>
        <ul style={{ paddingLeft: "20px", lineHeight: 1.7 }}>
          <li>Collecting funds for village development projects</li>
          <li>Spending funds responsibly for approved development work</li>
          <li>Road and drainage improvements</li>
          <li>Street lighting and public safety support</li>
          <li>School and community facility maintenance activities</li>
          <li>Clean water and sanitation development activities</li>
        </ul>
        <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
