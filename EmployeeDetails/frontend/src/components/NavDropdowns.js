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
      { label: "View Contributions", to: "/contributions/showContributions" },
      { label: "Funds by Activity", to: "/contributions/fundsReport" }
    ]
  },
  {
    title: "Activities",
    items: [
      { label: "Add Activity", to: "/activities/addActivity" },
      { label: "Show Activities", to: "/activities/showActivities" }
    ]
  }
];

const ADMIN_EMAIL = "mrao.mathi@gmail.com";

export default function NavDropdowns() {
  const [openTitle, setOpenTitle] = useState(null);
  const email = localStorage.getItem("email");

  const handleToggle = (title) => {
    setOpenTitle((prev) => (prev === title ? null : title));
  };

  const navItems = NAV_ITEMS.map((section) => {
    if (section.title === "Activities") {
      return {
        ...section,
        items: section.items.filter(
          (item) => item.label !== "Add Activity" || email === ADMIN_EMAIL
        ),
      };
    }
    if (section.title === "Contributions") {
      return {
        ...section,
        items: section.items.filter(
          (item) => item.label !== "Funds by Activity" || email === ADMIN_EMAIL
        ),
      };
    }
    return section;
  });

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "center" }}>
        {navItems.map(({ title, items }) => (
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
