import { Link } from "react-router-dom";
import { useState } from "react";

function Dropdown({ title, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
          border: "1px solid #ccc",
          padding: "8px 15px",
          borderRadius: "4px",
          cursor: "pointer",
          color: "#007bff"
        }}
      >
        {title} ⌄
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
            minWidth: "180px",
            zIndex: 1000
          }}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              style={{
                display: "block",
                padding: "10px",
                textDecoration: "none",
                color: "#333"
              }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
