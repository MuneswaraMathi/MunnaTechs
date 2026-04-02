import { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const NAV_ITEMS = [
  {
    title: "PersonalInfo",
    items: [{ label: "View PersonalInfo", to: "/personalDetails/showPersonalInfo" }]
  },
  {
    title: "Address",
    items: [
      { label: "Add Address", to: "/address/addAddress" },
      { label: "View Address", to: "/address/getAddress" }
    ]
  },
  {
    title: "Contributions",
    items: [
      { label: "Add Contribution", to: "/contributions/saveContribution" },
      { label: "View Contributions", to: "/contributions/showContributions" }
    ]
  }
];

export default function NavDropdowns() {
  const [openTitle, setOpenTitle] = useState(null);

  const handleToggle = (title) => {
    setOpenTitle((prev) => (prev === title ? null : title));
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "center" }}>
        {NAV_ITEMS.map(({ title, items }) => (
          <Dropdown
            key={title}
            title={title}
            items={items}
            isOpen={openTitle === title}
            onToggle={() => handleToggle(title)}
            onOpen={() => setOpenTitle(title)}
            onClose={() => setOpenTitle(null)}
          />
        ))}
      </div>
      <Link
        to="/logout"
        style={{
          position: "fixed",
          top: 0,
          right: 20,
          padding: "20px",
          display: "flex",
          alignItems: "right",
          gap: "100px",
          zIndex: 2000
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 1)")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)")}
      >
        logout
      </Link>
    </div>
  );
}
