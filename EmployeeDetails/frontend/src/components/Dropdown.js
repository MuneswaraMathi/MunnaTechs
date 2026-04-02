import { Link } from "react-router-dom";

function Dropdown({ title, items, isOpen, onToggle, onOpen, onClose }) {
  return (
    <div style={{ position: "relative" }} onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        onClick={onToggle}
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

      {isOpen && (
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f4ff";
                e.currentTarget.style.color = "#007bff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#333";
              }}
              onClick={onToggle}
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
